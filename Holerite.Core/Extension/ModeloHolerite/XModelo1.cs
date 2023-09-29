using Holerite.Core.Dtos;
using iText.Kernel.Pdf;
using iText.Kernel.Pdf.Canvas.Parser;
using System.Text;

namespace Holerite.Core.Extension.ModeloHolerite
{
    public static class XModelo1
    {
        public async static Task<List<ArquivosDto>> ModeloHolerite(this List<PessoasDto> listaPessoasDto, ArquivoDocumentosDto? documentosDto)
        {
            List<ArquivosDto> listaHolerites = new List<ArquivosDto>();
            List<string> listaUsuariosError = new List<string>();
            Stream stream = new MemoryStream(documentosDto.Arquivo);

            var empresa = listaPessoasDto.Select(pX => pX.Empresas);

            using (var pdf = new PdfReader(stream))
            {
                using (var doc = new PdfDocument(pdf))
                {
                    var teste1 = doc.GetNumberOfPages();
                    if (doc.GetNumberOfPages() == 0)
                    {
                        Console.WriteLine("Arquivo não contêm páginas");
                    }
                    else
                    {
                        for (int i = 1; i <= doc.GetNumberOfPages(); i++)
                        {
                            StringBuilder sb = new StringBuilder();
                            var ytt = doc.GetPageNumber(doc.GetPage(i));
                            var textPdf = sb.AppendLine(PdfTextExtractor.GetTextFromPage(doc.GetPage(i))).ToString();

                            PessoasDto? pessoa = null;
                            string? codigoFuncionario = null;
                            string mesArquivo = "";
                            using (StringReader reader = new StringReader(textPdf))
                            {
                                string linha;
                                int count = 1;
                                EmpresasDto nomeEmpresa = new EmpresasDto();
                                while ((linha = reader.ReadLine()) != null)
                                {
                                    if (count == 1)
                                    {
                                        empresa.DistinctBy(p => p.NomeEmpresa).ToList().ForEach(pX =>
                                        {
                                            var textoEmpresa = linha.Substring(0, pX.NomeEmpresa.Length);
                                            if (textoEmpresa.ToLower() == pX.NomeEmpresa.ToLower())
                                            {
                                                nomeEmpresa = pX;
                                                listaPessoasDto = listaPessoasDto.GroupBy(p => p.Empresas.NomeEmpresa)
                                                            .Where(p => p.Key.ToLower() == nomeEmpresa.NomeEmpresa.ToLower())
                                                            .ToDictionary(pR => pR.ToList()).ToList()[0].Key;
                                            }
                                        });
                                    }
                                    if (count == 3)
                                    {
                                        mesArquivo = Convert.ToInt64(linha.Substring(3, 2)).ToString("00");
                                    }
                                    if (count == 4)
                                    {
                                        if (linha != string.Empty)
                                        {
                                            codigoFuncionario = linha.Substring(0, 6);
                                            pessoa = listaPessoasDto.FirstOrDefault(pX => pX.CodigoFolha == codigoFuncionario && pX.EmpresasId == nomeEmpresa.Id);
                                            if (pessoa is null)
                                            {
                                                listaUsuariosError.Add($"Validar ou Cadastrar! - {linha} - Empressa: {nomeEmpresa.NomeEmpresa};");
                                                break;
                                            }
                                            var removerCodigoFuncionario = linha.Substring(7);
                                            Console.WriteLine(pessoa.Nome);
                                        }
                                        break;
                                    }
                                    count++;
                                }
                            }

                            if (pessoa != null)
                            {
                                if (!Directory.Exists("TEMP"))
                                    Directory.CreateDirectory("TEMP");

                                var caminhoSistema = Directory.GetCurrentDirectory() + "\\TEMP\\" + pessoa?.CodigoFolha + "_" + pessoa?.Nome + ".pdf";

                                var directory = Directory.GetCurrentDirectory();

                                try
                                {
                                    using (var pdfNovo = new PdfWriter(caminhoSistema))
                                    {
                                        using (var docNovo = new PdfDocument(pdfNovo))
                                        {
                                            doc.CopyPagesTo(i, i, docNovo);


                                        }
                                        List<FileInfo> arquivos = new List<FileInfo>();

                                        var arquivosPdf = Directory.GetFiles(Path.Combine(directory, "TEMP"), "*.PDF", SearchOption.AllDirectories).ToArray();
                                        arquivosPdf.ToList().ForEach(pX => arquivos.Add(new FileInfo(pX)));

                                        var item = arquivos.FirstOrDefault(pX => pX.FullName == caminhoSistema);

                                        if (item != null)
                                        {
                                            listaHolerites.Add(new ArquivosDto()
                                            {
                                                Arquivo = File.ReadAllBytes(item.FullName),
                                                ArquivoDocumentoId = documentosDto.Id,
                                                Mes = Convert.ToInt32(mesArquivo),
                                                EmailEnviado = false,
                                                NomeArquivo = item.Name,
                                                PessoasId = pessoa?.Id,
                                            });
                                            File.Delete(caminhoSistema);
                                        }
                                    }
                                }
                                catch (Exception error)
                                {

                                    throw new Exception(error.Message);
                                }
                            }                            
                        }
                    }
                }
            }
            if (listaUsuariosError.Any())
            {
                string mensagem = "";
                for (int i = 0; i < listaUsuariosError.Count; i++)
                    mensagem += listaUsuariosError[i].ToString() + "\n";
                    throw new Exception(mensagem);
            }
            return listaHolerites;
        }
    }
}
