using FluentValidation.Results;

namespace Holerite.Core.Validation;

public class ValidationResultBag : ValidationResult
{
    public object? Data { get; set; }
}
