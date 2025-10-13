using System;
namespace backend.Common.Interfaces
{
	public interface ICommandHandler<TCommand> where TCommand: ICommand
	{
		Task HandleAsync(TCommand command);
	}
}

