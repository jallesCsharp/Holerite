using iText.Kernel.Pdf;
using iText.Kernel.Utils;
using System.Globalization;
using System.Text.RegularExpressions;

namespace Holerite.Core.Extension;
public static class XExtension
{
    public static string AsString(this object pValor)
    {
        if (pValor is null) return string.Empty;
        return Convert.ToString(pValor);
    }

    public static decimal AsDecimal(this string pValor)
    {
        if (pValor is null) return 0;
        return Convert.ToDecimal(pValor.Replace(".", ","));
    }

    public static double AsDouble(this object pValor)
    {
        if (pValor is null) return 0;
        return Convert.ToDouble(pValor);
    }

    public static DateTime AsDateTime(this object pValor)
    {
        var dateTime = Convert.ToDateTime(pValor);
        if (dateTime.Kind == DateTimeKind.Utc)
            return dateTime;
        return DateTime.SpecifyKind(dateTime, DateTimeKind.Utc);
    }

    public static bool EstaVazio(this string pValor)
    {
        return string.IsNullOrEmpty(pValor);
    }

    public static bool AsBool(this string pValor)
    {
        return Convert.ToBoolean(pValor);
    }

    public static Int64 AsInt64(this object pValor)
    {
        return (Int64)Convert.ToInt64(pValor);
    }

    public static int AsInt32(this object pValor)
    {
        return (int)Convert.ToInt32(pValor);
    }

    public static UInt32 AsUInt32(this object pValor)
    {
        return (UInt32)Convert.ToUInt32(pValor);
    }

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

    public static string AsValidaSomenteNumerosCodFolha(this string entrada)
    {
        entrada = AsRetornarSomenteNumeros(entrada);
        return entrada.PadLeft(6, '0');
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

    public static byte[] GerarJuntarPfs(IList<byte[]> pdfs)
    {
        using (var writerMemoryStream = new MemoryStream())
        {
            using (var writer = new PdfWriter(writerMemoryStream))
            {
                using (var mergedDocument = new PdfDocument(writer))
                {
                    var merger = new PdfMerger(mergedDocument);

                    foreach (var pdfBytes in pdfs)
                    {
                        using (var copyFromMemoryStream = new MemoryStream(pdfBytes))
                        {
                            using (var reader = new PdfReader(copyFromMemoryStream))
                            {
                                using (var copyFromDocument = new PdfDocument(reader))
                                {
                                    merger.Merge(copyFromDocument, 1, copyFromDocument.GetNumberOfPages());
                                }
                            }
                        }
                    }
                }
            }

            return writerMemoryStream.ToArray();
        }
    }

    public static byte[] GerarBytes(this byte[]? entrada)
    {
        using (var writerMemoryStream = new MemoryStream())
        {
            using (var writer = new PdfWriter(writerMemoryStream))
            {
                using (var mergedDocument = new PdfDocument(writer))
                {
                    var merger = new PdfMerger(mergedDocument);
                    using (var copyFromMemoryStream = new MemoryStream(entrada))
                    {
                        using (var reader = new PdfReader(copyFromMemoryStream))
                        {
                            using (var copyFromDocument = new PdfDocument(reader))
                            {
                                merger.Merge(copyFromDocument, 1, copyFromDocument.GetNumberOfPages());
                            }
                        }
                    }
                }
            }

            return writerMemoryStream.ToArray();
        }
    }
}