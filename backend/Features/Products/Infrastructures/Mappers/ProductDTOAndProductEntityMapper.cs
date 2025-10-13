using System;
using AutoMapper;
using backend.Features.Products.APIs.DTOs;
using backend.Features.Products.Infrastructures.Entities;

namespace backend.Features.Products.Infrastructures.Mappers
{
	public class ProductDTOAndProductEntityMapper: Profile
	{
		public ProductDTOAndProductEntityMapper()
		{
			CreateMap<ProductsDTO, ProductEntity>()
				.ForMember(dst => dst.Id, opt => opt.MapFrom(src => src.Id))
				.ForMember(dst => dst.Name, opt => opt.MapFrom(src => src.Name))
				.ForMember(dst => dst.Price, opt => opt.MapFrom(src => src.Price))
				.ForMember(dst => dst.Stock, opt => opt.MapFrom(src => src.Stock));
			CreateMap<ProductEntity, ProductsDTO>()
                .ForMember(dst => dst.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dst => dst.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dst => dst.Price, opt => opt.MapFrom(src => src.Price))
				.ForMember(dst => dst.Stock, opt => opt.MapFrom(src => src.Stock));
        }
	}
}

