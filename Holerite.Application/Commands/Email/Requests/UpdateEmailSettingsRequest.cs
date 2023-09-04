using Holerite.Core.Messages;

namespace Holerite.Application.Commands.Email.Requests;

public class UpdateEmailSettingsRequest : Command
{
    public Guid Id { get; set; }
    public Guid? EmpresasId { get; set; }
    public string? ServidorSMTP { get; set; }
    public int? Porta { get; set; }
    public bool? RequerSSL { get; set; }
    public bool? RequerTLS { get; set; }
    public bool? Autenticao { get; set; }
    public string? SenderNome { get; set; }
    public string? Password { get; set; }
}
