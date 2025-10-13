using System;
namespace backend.Auth.Infrastructures.Entities
{
	public class RefreshTokenEntity
	{
        public int Id { get; set; }
        public string Token { get; set; } = string.Empty;
        public DateTime Expires { get; set; }
        public bool IsRevoked { get; set; }
        public int UserId { get; set; }
        public UserEntity? User { get; set; }
        // if multi-device available, can enable this prop
        //public string Device { get; set; } = null!;
    }
}

