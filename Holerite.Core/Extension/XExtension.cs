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

    public static int AsInt(this object entrada)
    {
        return Convert.ToInt16(entrada);
    }

    public static string GetMes(this object entrada)
    {
        var teste = new DateTimeFormatInfo().GetMonthName(entrada.AsInt());
        return Convert.ToString(teste);
    }
}