import React from 'react';

const MassTransitCodeSample = () => `
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
    `;

export default MassTransitCodeSample;
