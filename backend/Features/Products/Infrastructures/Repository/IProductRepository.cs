using System;
using backend.Features.Products.APIs.DTOs;

namespace backend.Features.Products.Infrastructures.Repository
{
	public interface IProductRepository
	{
		Task<ProductsDTO> GetProductByIdAsync(Guid id);
		Task<IList<ProductsDTO>> GetProductsAsync();
	}
}

