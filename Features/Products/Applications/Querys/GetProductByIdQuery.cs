using System;
using backend.Common.Interfaces;
using backend.Features.Products.APIs.DTOs;

namespace backend.Features.Products.Applications.Querys
{
	public class GetProductByIdQuery: IQuery<ProductsDTO>
    {
        public Guid Id { get; set; }
    }
}

