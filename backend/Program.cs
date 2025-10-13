using System.Collections.Generic;
using System.Text;
using backend.Auth.Applications.CommandHandlers;
using backend.Auth.Applications.Services;
using backend.Auth.Infrastructures.Contexts;
using backend.Auth.Infrastructures.Repos;
using backend.Common.Interfaces;
using backend.Features.Products.APIs.DTOs;
using backend.Features.Products.Applications.QueryHandlers;
using backend.Features.Products.Applications.Querys;
using backend.Features.Products.Infrastructures.Context;
using backend.Features.Products.Infrastructures.Mappers;
using backend.Features.Products.Infrastructures.Repository;
using backend.Messaging.RabbitMQ.Services;
using MassTransit;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);


//builder.Services.AddAuthentication(options =>
//{
//    options.DefaultScheme = "Cookies";
//    options.DefaultChallengeScheme = "GitHub";
//})
//.AddCookie()
//.AddOAuth("GitHub", options =>
//{
//    options.ClientId = "clientid";
//    options.ClientSecret = "secret";
//    options.CallbackPath = "/signin-github";
//    options.AuthorizationEndpoint = "https://github.com/login/oauth/authorize";
//    options.TokenEndpoint = "https://github.com/login/oauth/access_token";
//    options.UserInformationEndpoint = "https://api.github.com/user";
//});


// ---------------------------
// Database contexts
// ---------------------------
builder.Services.AddDbContext<ProductDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddDbContext<AuthDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("AuthConnection")));

// ---------------------------
// JWT Authentication
// ---------------------------
var jwtConfig = builder.Configuration.GetSection("Jwt");

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = jwtConfig["Issuer"],
            ValidateAudience = true,
            ValidAudience = jwtConfig["Audience"],
            ValidateLifetime = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(jwtConfig["SecretKey"])
            ),
            ValidateIssuerSigningKey = true,
            ClockSkew = TimeSpan.Zero
        };
    });

// ----------------------------
// Register
// ----------------------------
// Assuming 'ProductProfile' is a class that inherits from AutoMapper.Profile
builder.Services.AddAutoMapper(typeof(ProductDTOAndProductEntityMapper).Assembly);
// Register repositories and services
builder.Services.AddScoped<IAuthRepo, AuthRepo>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();

// Register application services
builder.Services.AddScoped<IAuthService, AuthService>();

// Register command handlers
builder.Services.AddScoped<LoginCommandHandler>();
builder.Services.AddScoped<RefreshCommandHandler>();
builder.Services.AddScoped<
    IQueryHandler<GetProductByIdQuery, ProductsDTO>, GetProductByIdQueryHandler>();
builder.Services.AddScoped<
    IQueryHandler<GetProductsQuery, IList<ProductsDTO>>,GetProductsQueryHandler >();


// ---------------------------
// Swagger with JWT
// ---------------------------
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Enter 'Bearer {token}'"
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme { Reference = new OpenApiReference
                { Type = ReferenceType.SecurityScheme, Id = "Bearer" } },
            new string[] {}
        }
    });
});


// ---------------------------
// CORS Config
// ---------------------------
var allowedOrigins = builder.Configuration.GetSection("AllowedOrigins").Get<string[]>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("DynamicCorsPolicy", policy =>
    {
        policy.WithOrigins(allowedOrigins)
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

// ---------------------------
// Controllers
// ---------------------------
builder.Services.AddControllers();

// ---------------------------
// CSRF token
// ---------------------------
builder.Services.AddAntiforgery(options =>
{
    options.HeaderName = "X-XSRF-TOKEN";
});

// ---------------------------
// Add MassTransit/RabbitMQ
// ---------------------------
builder.Services.AddMassTransit(x =>
{
    // Register the consumer
    x.AddConsumer<EmailMessageConsumer>();

    // Use RabbitMQ as transport
    x.UsingRabbitMq((context, cfg) =>
    {
        cfg.Host(builder.Configuration["RabbitMQ:Host"], "/", h =>
        {
            h.Username(builder.Configuration["RabbitMQ:Username"]);
            h.Password(builder.Configuration["RabbitMQ:Password"]);
        });

        // Automatically configure endpoints for all consumers
        cfg.ConfigureEndpoints(context);

        // if using v4, we should using QuorumQueue: SetQuorumQueue(); 
    });
});


var app = builder.Build();

// ---------------------------
// Middleware pipeline
// ---------------------------
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// should be before UseRouting() and UseEndpoints()
app.UseExceptionHandler("/error");

app.UseHttpsRedirection();

app.UseRouting(); // required before CORS

app.UseCors("DynamicCorsPolicy"); // must be before auth, after routing

app.UseAuthentication(); // must be before UseAuthorization()
app.UseAuthorization();

app.MapControllers();

app.Run();

