using backend.Common.Interfaces;
using backend.Features.Products.APIs.DTOs;
using backend.Features.Products.Applications.Querys;
using backend.Features.Products.Infrastructures.Repository;

namespace backend.Features.Products.Applications.QueryHandlers
{
    public class GetProductByIdQueryHandler: IQueryHandler<GetProductByIdQuery, ProductsDTO>
    {
        private readonly IProductRepository _repo;
		public GetProductByIdQueryHandler(IProductRepository repo)
		{
            _repo = repo;
		}

        public async Task<ProductsDTO> HandleAsync(GetProductByIdQuery query)
        {
            var dto = await _repo.GetProductByIdAsync(query.Id);
            return dto;
        }
    }
}

