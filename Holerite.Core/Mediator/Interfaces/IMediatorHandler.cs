using Holerite.Core.Messages;
using Holerite.Core.Validation;

namespace Holerite.Core.Mediator.Interfaces
{
    public interface IMediatorHandler
    {
        public Task PublishEvent<T>(T evnt) where T : Event;
        public Task<ValidationResultBag> SendCommand<T>(T command) where T : Command;
    }
}
