using System.Text;
using backend.Features.Products.Infrastructures.Context;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<ProductDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
//builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();
// Add Swagger + enable entering Bearer token
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    // Add JWT support to Swagger UI
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
            new OpenApiSecurityScheme { Reference = new OpenApiReference { Type=ReferenceType.SecurityScheme, Id="Bearer" } },
            new string[] {}
        }
    });
});




builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = "http://ThisProduct",
            ValidateAudience = true,
            ValidAudience = "http://MyClient",
            ValidateLifetime = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(backend.Auth.AuthHelper.SecretKey)),
            ValidateIssuerSigningKey = true,
            ClockSkew = TimeSpan.Zero // so that the new token can work immediately
        };
    });

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



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseExceptionHandler("/error");
// should be before UseRouting() and UseEndpoints()

app.UseHttpsRedirection();
app.UseAuthentication(); // ← must be before UseAuthorization()
app.UseAuthorization();

app.MapControllers();

app.Run();

