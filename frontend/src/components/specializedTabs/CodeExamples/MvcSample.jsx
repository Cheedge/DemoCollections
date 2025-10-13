import React from 'react';
const MvcSample = () =>
    `[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
  private readonly IProductService _service;
  
  public ProductsController(IProductService service)
  {
    _service = service;
  }
  
  [HttpGet("{id}")]
  [ProducesResponseType(typeof(Product), 200)]
  [ProducesResponseType(404)]
  public async Task<IActionResult> Get(int id)
  {
    var product = await _service.GetByIdAsync(id);
    return product == null ? NotFound() : Ok(product);
  }
  
  [HttpPost]
  public async Task<IActionResult> Create(ProductDto dto)
  {
    var product = await _service.CreateAsync(dto);
    return CreatedAtAction(nameof(Get), new { id = product.Id }, product);
  }
}`;

export default MvcSample;
