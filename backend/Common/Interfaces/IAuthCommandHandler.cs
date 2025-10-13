using System;
namespace backend.Common.Interfaces
{
	public interface IAuthCommandHandler<TCommand> where TCommand : ICommand
	{
		Task<(string accessToken, string refreshToken)> HandleAsync(TCommand command);
	}
}

