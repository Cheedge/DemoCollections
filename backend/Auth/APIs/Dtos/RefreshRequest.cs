using System;
namespace backend.Auth.APIs.Dtos
{
	public class RefreshRequest
	{
        public string RefreshToken { get; set; } = string.Empty;
	}	
}

