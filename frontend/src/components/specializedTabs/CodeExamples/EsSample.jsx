import React from 'react';

const EsSample = () =>
    `public abstract class Event
{
  public Guid AggregateId { get; set; }
  public DateTime Timestamp { get; set; } = DateTime.UtcNow;
}

public class OrderCreatedEvent : Event
{
  public decimal TotalAmount { get; set; }
}

public class Order
{
  private List<Event> _events = new();
  public Guid Id { get; private set; }
  
  public void Apply(OrderCreatedEvent e)
  {
    Id = e.AggregateId;
    // Update state from event
  }
  
  public void CreateOrder(decimal amount)
  {
    var e = new OrderCreatedEvent { AggregateId = Guid.NewGuid(), TotalAmount = amount };
    Apply(e);
    _events.Add(e);
  }
}`;
export default EsSample;
