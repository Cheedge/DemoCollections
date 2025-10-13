using System;
namespace backend.Features.Products.Infrastructures.Entities
{
	public class ProductEntity
	{
		public Guid Id { get; set; }
		public string Name { get; set; }
		public double Price { get; set; }
		public int Stock { get; set; }
	}
}

