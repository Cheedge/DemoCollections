// pure RabbitMQ implement is obsolete, now changing to MassTransit

/*
using System;
using RabbitMQ.Client;
using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Options;

namespace backend.Messaging.RabbitMQ.Services
{
	public class RabbitMqProducer
	{
        private readonly string _hostname;
        private readonly string _queueName;
        private readonly string _username;
        private readonly string _password;

        public RabbitMqProducer(IConfiguration config)
        {
            _hostname = config["RabbitMQ:Host"];
            _queueName = config["RabbitMQ:QueueName"];
            _username = config["RabbitMQ:Username"];
            _password = config["RabbitMQ:Password"];
        }

        public void SendMessage<T>(T message)
        {
            var factory = new ConnectionFactory()
            {
                HostName = _hostname,
                UserName = _username,
                Password = _password
            };

            using var connection = factory.CreateConnection();
            using var channel = connection.CreateModel();

            channel.QueueDeclare(
                queue: _queueName,
                durable: false,
                exclusive: false,
                autoDelete: false,
                arguments: null
            );

            var body = Encoding.UTF8.GetBytes(JsonSerializer.Serialize(message));
            channel.BasicPublish(
                exchange: "",
                routingKey: _queueName,
                basicProperties: null,
                body: body
            );
        }
    }
}

*/