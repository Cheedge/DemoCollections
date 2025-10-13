using System;
using backend.Common.Interfaces;
using backend.Features.Products.APIs.DTOs;
using backend.Features.Products.Applications.Querys;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace backend.Features.Products.APIs.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class ProductsController: ControllerBase
	{
		private readonly IQueryHandler<GetProductByIdQuery, ProductsDTO> _getByIdQueryHandler;
		private readonly IQueryHandler<GetProductsQuery, IList<ProductsDTO>> _getAllQueryHandler;
		public ProductsController(
            IQueryHandler<GetProductByIdQuery, ProductsDTO> getByIdQueryHandler,
            IQueryHandler<GetProductsQuery, IList<ProductsDTO>> getAllQueryHandler
        )
		{
			_getAllQueryHandler = getAllQueryHandler;
			_getByIdQueryHandler = getByIdQueryHandler;
		}

		[HttpGet("{id:guid}")]
		public async Task<ActionResult<ProductsDTO>> GetProductById([FromRoute] Guid id)
		{
			var query = new GetProductByIdQuery
			{
				Id = id
			};
			var res = await _getByIdQueryHandler.HandleAsync(query);
			if(res == null)
			{
				return NotFound();
			}
			return Ok(res);
		}

		[HttpGet]
		public async Task<ActionResult<IList<ProductsDTO>>> GetProducts()
		{
			var q = new GetProductsQuery();
            var res = await _getAllQueryHandler.HandleAsync(q);
			if(res == null)
			{
				return NotFound();
			}
			return Ok(res);
		}
	}
}

