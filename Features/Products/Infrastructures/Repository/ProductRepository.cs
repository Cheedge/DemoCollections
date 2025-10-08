using System;
using AutoMapper;
using backend.Features.Products.APIs.DTOs;
using backend.Features.Products.Infrastructures.Context;
using Microsoft.EntityFrameworkCore;

namespace backend.Features.Products.Infrastructures.Repository
{
	public class ProductRepository: IProductRepository
    {
		private readonly IMapper _mapper;
		private readonly ProductDbContext _context;

		public ProductRepository(IMapper mapper, ProductDbContext context)
		{
			_mapper = mapper;
			_context = context;
		}

        public async Task<ProductsDTO> GetProductByIdAsync(Guid id)
        {
            var entity = await _context.Products.FindAsync(id) ??
                throw new ArgumentNullException($"id:{id} not exist");
            return _mapper.Map<ProductsDTO>(entity);
        }

        public async Task<IList<ProductsDTO>> GetProductsAsync()
        {
            var entities = await _context.Products.ToListAsync();
            return entities.Select(e=>_mapper.Map<ProductsDTO>(e)).ToList();
        }
    }
}

