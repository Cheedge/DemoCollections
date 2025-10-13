using Xunit;
using Moq;
using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Features.Products.Applications.QueryHandlers;
using backend.Features.Products.Applications.Querys;
using backend.Features.Products.APIs.DTOs;
using backend.Features.Products.Infrastructures.Repository;
namespace backend.Tests.Features.Products
{

    public class GetProductsQueryHandlerTests
    {
        private readonly List<ProductsDTO> _products;
        private readonly Guid _id;
        public GetProductsQueryHandlerTests()
        {
            var id = Guid.NewGuid();
            var products = new List<ProductsDTO> {
                new ProductsDTO {
                    Id = id,
                    Name = "user",
                    Price = 66.6,
                    Stock = 100
                }
            };
            _id = id;
            _products = products;
        }

        [Fact]
        public async Task HandleAsync_ReturnsProductsList()
        {
            var repoMock = new Mock<IProductRepository>();
            repoMock.Setup(r => r.GetProductsAsync()).ReturnsAsync(_products);

            var handler = new GetProductsQueryHandler(repoMock.Object);
            var result = await handler.HandleAsync(new GetProductsQuery());

            Assert.Single(result);
            Assert.Equal(_id, result[0].Id);
            Assert.Equal("user", result[0].Name);
            Assert.Equal(66.6, result[0].Price);
            Assert.Equal(100, result[0].Stock);
        }

        [Fact]
        public async Task HandleAsync_NullProducts_ThrowsException()
        {
            var repoMock = new Mock<IProductRepository>();
            repoMock.Setup(r => r.GetProductsAsync()).ReturnsAsync((IList<ProductsDTO>?)null);

            var handler = new GetProductsQueryHandler(repoMock.Object);

            await Assert.ThrowsAsync<ArgumentNullException>(() =>
                handler.HandleAsync(new GetProductsQuery()));
        }
    }
}
