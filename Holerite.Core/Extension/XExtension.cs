using System.Globalization;
using System.Text.RegularExpressions;

namespace Holerite.Core.Extension;
public static class XExtension
{
    public static string IsRemoverAcentosECaracteresEspeciais(string entrada)
    {
        return new string(entrada
            .Normalize(System.Text.NormalizationForm.FormD)
            .ToCharArray()
            .Where(c => CharUnicodeInfo.GetUnicodeCategory(c) != UnicodeCategory.NonSpacingMark)
            .ToArray());
    }

    public static string IsRetornarSomenteNumeros(string entrada)
    {
        return Regex.Replace(entrada, @"[^\d]", "");
    }
}