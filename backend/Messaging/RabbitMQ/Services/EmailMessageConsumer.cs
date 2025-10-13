using System;
using MassTransit;
using System.Net.Mail;
using backend.Messaging.RabbitMQ.Models;

namespace backend.Messaging.RabbitMQ.Services
{
    public class EmailMessageConsumer : IConsumer<EmailMessageDto>
    {
        private readonly ILogger<EmailMessageConsumer> _logger;

        public EmailMessageConsumer(ILogger<EmailMessageConsumer> logger)
        {
            _logger = logger;
        }

        public Task Consume(ConsumeContext<EmailMessageDto> context)
        {
            var msg = context.Message;
            _logger.LogInformation("Sending email to {To}: {Subject}", msg.To, msg.Subject);

            // simulate sending email
            Thread.Sleep(1000);

            _logger.LogInformation("Email sent to {To}", msg.To);
            return Task.CompletedTask;
        }
    }
}

