using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace XUtilities.NetCore6.Seguranca
{
    public static class XAesCrip
    {
        public const String Token = "acf7ef943fdeb3cbfed8dd0d8f584731";

        public static String Criptografar(String pTexto)
        {
            return XAes.CriptografarComSenha(pTexto, Token);
        }

        public static String Decriptografar(String pTexto)
        {
            return XAes.DecriptografarComSenha(pTexto, Token);
        }
    }
}
