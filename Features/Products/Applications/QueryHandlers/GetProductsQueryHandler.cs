using System;
using backend.Common.Interfaces;
using backend.Features.Products.APIs.DTOs;
using backend.Features.Products.Applications.Querys;
using backend.Features.Products.Infrastructures.Repository;

namespace backend.Features.Products.Applications.QueryHandlers
{
    public class GetProductsQueryHandler : IQueryHandler<GetProductsQuery, IList<ProductsDTO>>
	{
        private readonly IProductRepository _repo;
        public GetProductsQueryHandler(IProductRepository repo)
        {
            _repo = repo;
        }

        public async Task<IList<ProductsDTO>> HandleAsync(GetProductsQuery query)
        {
            var dtos = await _repo.GetProductsAsync() ??
                throw new ArgumentNullException($"no products info exist.");
            return dtos;
        }
	}
}

