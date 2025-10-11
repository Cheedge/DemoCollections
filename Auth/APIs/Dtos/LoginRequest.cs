using System;
namespace backend.Auth.APIs.Dtos
{
	public class LoginRequest
	{
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}

