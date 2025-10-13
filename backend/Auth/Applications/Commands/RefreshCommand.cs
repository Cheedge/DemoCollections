using System;
using backend.Common.Interfaces;

namespace backend.Auth.Applications.Commands
{
	public class RefreshCommand: ICommand
	{
		public required string RefreshToken { get; set; }

    }
}

