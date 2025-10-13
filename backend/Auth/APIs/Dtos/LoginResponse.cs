using System;
namespace backend.Auth.APIs.Dtos
{
	public class LoginResponse
	{
		public required string AccessToken { get; set; }
		public required string RefreshToken { get; set; }
    }
}

