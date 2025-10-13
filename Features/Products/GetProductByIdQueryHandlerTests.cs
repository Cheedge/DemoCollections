using System;
using backend.Features.Products.APIs.DTOs;
using backend.Features.Products.Applications.QueryHandlers;
using backend.Features.Products.Applications.Querys;
using backend.Features.Products.Infrastructures.Repository;
using Moq;

namespace backend.Tests.Features.Products
{
    public class GetProductByIdQueryHandlerTests
    {

        private readonly ProductsDTO _dto;
        private readonly Guid _id;
        public GetProductByIdQueryHandlerTests()
        {
            var id = Guid.NewGuid();
            var dto = new ProductsDTO
            {
                Id = id,
                Name = "Test",
                Price = 66.6,
                Stock = 100
            };
            _dto = dto;
            _id = id;
        }

        [Fact]
        public async Task HandleAsync_ReturnsProduct()
        {
            var repoMock = new Mock<IProductRepository>();

            repoMock.Setup(r => r.GetProductByIdAsync(_id)).ReturnsAsync(_dto);

            var handler = new GetProductByIdQueryHandler(repoMock.Object);
            var query = new GetProductByIdQuery { Id = _id };

            var result = await handler.HandleAsync(query);

            Assert.Equal(_dto, result);
        }
    }
}

