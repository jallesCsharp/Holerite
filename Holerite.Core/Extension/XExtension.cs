using System.Globalization;
using System.Text.RegularExpressions;

namespace Holerite.Core.Extension;
public static class XExtension
{
    public static string AsRemoverAcentosECaracteresEspeciais(this string entrada)
    {
        return new string(entrada
            .Normalize(System.Text.NormalizationForm.FormD)
            .ToCharArray()
            .Where(c => CharUnicodeInfo.GetUnicodeCategory(c) != UnicodeCategory.NonSpacingMark)
            .ToArray());
    }

    public static string AsRetornarSomenteNumeros(this string entrada)
    {
        return Regex.Replace(entrada, @"[^\d]", "");
    }

    public static string AsValidaSomenteNumerosCpf(this string entrada)
    {
        entrada = AsRetornarSomenteNumeros(entrada);
        return entrada.PadLeft(11, '0');
    }
}