using Xunit;
using Moq;
using System.Threading.Tasks;
using backend.Messaging.RabbitMQ.Services;
using backend.Messaging.RabbitMQ.Models;
using MassTransit;
using Microsoft.Extensions.Logging;
namespace backend.Tests.Messaging
{
    public class EmailMessageConsumerTests
    {
        [Fact]
        public async Task Consume_LogsInformation()
        {
            var loggerMock = new Mock<ILogger<EmailMessageConsumer>>();
            var consumer = new EmailMessageConsumer(loggerMock.Object);

            var contextMock = new Mock<ConsumeContext<EmailMessageDto>>();
            contextMock.Setup(c => c.Message).Returns(new EmailMessageDto
            {
                To = "test@example.com",
                Subject = "Hello"
            });

            await consumer.Consume(contextMock.Object);

            loggerMock.Verify(
                l => l.Log(
                    It.IsAny<LogLevel>(),
                    It.IsAny<EventId>(),
                    It.IsAny<It.IsAnyType>(),
                    It.IsAny<Exception>(),
                    (Func<It.IsAnyType, Exception?, string>)It.IsAny<object>()),
                Times.AtLeastOnce);
        }
    }
}

