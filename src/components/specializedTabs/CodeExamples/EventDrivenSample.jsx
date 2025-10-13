import React from 'react';

const EventDrivenSample = () =>
    `public interface IEventBus
{
  Task PublishAsync<T>(T @event) where T : class;
}

public class OrderPlacedEvent
{
  public int OrderId { get; set; }
  public decimal Amount { get; set; }
}

public class OrderPlacedEventHandler : IEventHandler<OrderPlacedEvent>
{
  private readonly IEmailService _emailService;
  
  public async Task HandleAsync(OrderPlacedEvent @event)
  {
    await _emailService.SendOrderConfirmationAsync(@event.OrderId);
  }
}

// Publisher
await _eventBus.PublishAsync(new OrderPlacedEvent 
{ 
  OrderId = 123, 
  Amount = 99.99m 
});`;
export default EventDrivenSample;
