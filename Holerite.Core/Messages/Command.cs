using MediatR;
using FluentValidation.Results;
using Holerite.Core.Validation;

namespace Holerite.Core.Messages;

public abstract class Command : IRequest<ValidationResultBag>
{
    public DateTime Timestamp { get; private set; }
    public ValidationResult ValidationResult { get; set; } = new ValidationResult();

    protected Command() => Timestamp = DateTime.UtcNow;

    public virtual bool IsValid()
    {
        throw new NotImplementedException();
    }
}
