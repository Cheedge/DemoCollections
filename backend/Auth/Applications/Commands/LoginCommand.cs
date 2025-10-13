using System;
using backend.Common.Interfaces;

namespace backend.Auth.Applications.Commands
{
	public class LoginCommand: ICommand
	{
		public required string UserName { get; set; }
		public required string PassWord { get; set; }
	}
}

