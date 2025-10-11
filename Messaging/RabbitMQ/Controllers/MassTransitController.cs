using System;
using MassTransit;
using Microsoft.AspNetCore.Mvc;
using backend.Messaging.RabbitMQ.Models;

namespace backend.Messaging.RabbitMQ.Controllers
{
	public class MassTransitController: ControllerBase
	{
        private readonly IPublishEndpoint _publishEndpoint;

        public MassTransitController(IPublishEndpoint publishEndpoint)
        {
            _publishEndpoint = publishEndpoint;
        }

        [HttpPost("send-email")]
        public async Task<IActionResult> SendEmail([FromBody] EmailMessageDto message)
        {
            await _publishEndpoint.Publish(message);
            return Ok($"Email queued for {message.To}");
        }
    }
}

