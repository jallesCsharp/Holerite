using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace XUtilities.NetCore6.Seguranca
{
    public static class XAes
    {
        public static readonly int BlockBitSize = 128;
        public static readonly int KeyBitSize = 256;

        public static readonly int SaltBitSize = 64;
        public static readonly int Iterations = 10000;
        public static readonly int MinPasswordLength = 12;

        /// <summary>
        /// Simple Encryption then Authentication of a UTF8 message
        /// using Keys derived from a Password
        /// </summary>
        /// <param name="pSecretMesage">The secret mesage.</param>
        /// <param name="pPassword">The password.</param>
        /// <param name="pNonSecretPayload"></param>
        /// <returns>Encrypted Message</returns>
        /// <remarks>Significantly less secure than using random binary keys.
        ///  Adds additional non secret payload for key generation parameters. </remarks>
        public static string CriptografarComSenha(string pSecretMesage, string pPassword, byte[] pNonSecretPayload = null)
        {
            if (String.IsNullOrWhiteSpace(pSecretMesage))
                return String.Empty;

            pNonSecretPayload = pNonSecretPayload ?? new byte[] { };

            //User Error Checks
            if (string.IsNullOrWhiteSpace(pPassword) || pPassword.Length < MinPasswordLength)
                throw new ArgumentException(String.Format("Must have a password of at least {0} characters!", MinPasswordLength), "pAssword");

            if (string.IsNullOrEmpty(pSecretMesage))
                throw new ArgumentException("Secret Message Required!", "pSecretMesage");

            var payload = new byte[((SaltBitSize / 8) * 2) + pNonSecretPayload.Length];

            Array.Copy(pNonSecretPayload, payload, pNonSecretPayload.Length);
            int payloadIndex = pNonSecretPayload.Length;

            byte[] cryptKey;
            byte[] authKey;
            //Use Random Salt to prevent pre-generated weak password attacks.
            using (var generator = new Rfc2898DeriveBytes(pPassword, SaltBitSize / 8, Iterations))
            {
                var salt = generator.Salt;

                //Generate Keys
                cryptKey = generator.GetBytes(KeyBitSize / 8);

                //Create Non Secret Payload
                Array.Copy(salt, 0, payload, payloadIndex, salt.Length);
                payloadIndex += salt.Length;
            }

            //Deriving separate key, might be less efficient than using HKDF, 
            //but now compatible with RNEncryptor which had a very similar wireformat and requires less code than HKDF.
            using (var generator = new Rfc2898DeriveBytes(pPassword, SaltBitSize / 8, Iterations))
            {
                var salt = generator.Salt;

                //Generate Keys
                authKey = generator.GetBytes(KeyBitSize / 8);

                //Create Rest of Non Secret Payload
                Array.Copy(salt, 0, payload, payloadIndex, salt.Length);
            }

            return Criptografar(pSecretMesage, cryptKey, authKey, payload);
        }

        /// <summary>
        /// Simple Encryption(AES) then Authentication (HMAC) for a UTF8 Message.
        /// </summary>
        /// <param name="pSecretMessage">The secret message.</param>
        /// <param name="pCryptKey">The crypt key.</param>
        /// <param name="pAuthKey">The auth key.</param>
        /// <param name="pNonSecretPayload">(Optional) Non-Secret Payload.</param>
        /// <returns>Encrypted Message</returns>
        /// <remarks>
        /// Adds overhead of (Optional-Payload + BlockSize(16) + Message-Padded-To-Blocksize +  HMac-Tag(32)) * 1.33 Base64
        /// </remarks>
        public static string Criptografar(string pSecretMessage, byte[] pCryptKey, byte[] pAuthKey, byte[] pNonSecretPayload = null)
        {
            //User Error Checks
            if (pCryptKey == null || pCryptKey.Length != KeyBitSize / 8)
                throw new ArgumentException(String.Format("Key needs to be {0} bit!", KeyBitSize), "pCryptKey");

            if (pAuthKey == null || pAuthKey.Length != KeyBitSize / 8)
                throw new ArgumentException(String.Format("Key needs to be {0} bit!", KeyBitSize), "pAuthKey");

            if (string.IsNullOrEmpty(pSecretMessage))
                throw new ArgumentException("Secret Message Required!", "pSecretMessage");

            //non-secret payload optional
            pNonSecretPayload = pNonSecretPayload ?? new byte[] { };

            byte[] cipherText;
            byte[] iv;

            using (var aes = new AesManaged
            {
                KeySize = KeyBitSize,
                BlockSize = BlockBitSize,
                Mode = CipherMode.CBC,
                Padding = PaddingMode.PKCS7
            })
            {

                //Use random IV
                aes.GenerateIV();
                iv = aes.IV;

                using (var encrypter = aes.CreateEncryptor(pCryptKey, iv))
                using (var cipherStream = new MemoryStream())
                {
                    using (var tCryptoStream = new CryptoStream(cipherStream, encrypter, CryptoStreamMode.Write))
                    using (var tBinaryWriter = new BinaryWriter(tCryptoStream))
                    {
                        //Encrypt Data
                        tBinaryWriter.Write(Encoding.UTF8.GetBytes(pSecretMessage));
                    }

                    cipherText = cipherStream.ToArray();
                }

            }

            //Assemble encrypted message and add authentication
            using (var hmac = new HMACSHA256(pAuthKey))
            using (var encryptedStream = new MemoryStream())
            {
                using (var binaryWriter = new BinaryWriter(encryptedStream))
                {
                    //Prepend non-secret payload if any
                    binaryWriter.Write(pNonSecretPayload);
                    //Prepend IV
                    binaryWriter.Write(iv);
                    //Write Ciphertext
                    binaryWriter.Write(cipherText);
                    binaryWriter.Flush();

                    //Authenticate all data
                    var tag = hmac.ComputeHash(encryptedStream.ToArray());
                    //Postpend tag
                    binaryWriter.Write(tag);
                }
                return Convert.ToBase64String(encryptedStream.ToArray());
            }

        }

        /// <summary>
        /// Simple Authentication (HMAC) and then Descryption (AES) of a UTF8 Message
        /// using keys derived from a password.
        /// </summary>
        /// <param name="pEncryptedMessage">The encrypted message.</param>
        /// <param name="pPassword">The password.</param>
        /// <param name="pNonSecretPayloadLength">Length of the non secret payload.</param>
        /// <returns>
        /// Decrypted Message
        /// </returns>
        /// <exception cref="System.ArgumentException">password</exception>
        /// <remarks>
        /// Significantly less secure than using random binary keys.
        /// </remarks>
        public static string DecriptografarComSenha(string pEncryptedMessage, string pPassword, int pNonSecretPayloadLength = 0)
        {
            if (String.IsNullOrWhiteSpace(pEncryptedMessage))
                return String.Empty;
            //User Error Checks
            if (string.IsNullOrWhiteSpace(pPassword) || pPassword.Length < MinPasswordLength)
                throw new ArgumentException(String.Format("Must have a password of at least {0} characters!", MinPasswordLength), "password");

            if (string.IsNullOrWhiteSpace(pEncryptedMessage))
                throw new ArgumentException("Encrypted Message Required!", "pEncryptedMessage");

            var cryptSalt = new byte[SaltBitSize / 8];
            var authSalt = new byte[SaltBitSize / 8];

            var message = Convert.FromBase64String(pEncryptedMessage);

            //Grab Salt from Non-Secret Payload
            Array.Copy(message, pNonSecretPayloadLength, cryptSalt, 0, cryptSalt.Length);
            Array.Copy(message, pNonSecretPayloadLength + cryptSalt.Length, authSalt, 0, authSalt.Length);

            byte[] cryptKey;
            byte[] authKey;

            //Generate crypt key
            using (var generator = new Rfc2898DeriveBytes(pPassword, cryptSalt, Iterations))
            {
                cryptKey = generator.GetBytes(KeyBitSize / 8);
            }
            //Generate auth key
            using (var generator = new Rfc2898DeriveBytes(pPassword, authSalt, Iterations))
            {
                authKey = generator.GetBytes(KeyBitSize / 8);
            }

            return Decriptografar(pEncryptedMessage, cryptKey, authKey, cryptSalt.Length + authSalt.Length + pNonSecretPayloadLength);
        }

        /// <summary>
        /// Simple Authentication (HMAC) then Decryption (AES) for a secrets UTF8 Message.
        /// </summary>
        /// <param name="pEncryptedMessage">The encrypted message.</param>
        /// <param name="pCryptKey">The crypt key.</param>
        /// <param name="pAuthKey">The auth key.</param>
        /// <param name="pNonSecretPayloadLength">Length of the non secret payload.</param>
        /// <returns>Decrypted Message</returns>
        public static string Decriptografar(string pEncryptedMessage, byte[] pCryptKey, byte[] pAuthKey, int pNonSecretPayloadLength = 0)
        {

            //Basic Usage Error Checks
            if (pCryptKey == null || pCryptKey.Length != KeyBitSize / 8)
                throw new ArgumentException(String.Format("CryptKey needs to be {0} bit!", KeyBitSize), "pCryptKey");

            if (pAuthKey == null || pAuthKey.Length != KeyBitSize / 8)
                throw new ArgumentException(String.Format("AuthKey needs to be {0} bit!", KeyBitSize), "pAuthKey");

            if (string.IsNullOrWhiteSpace(pEncryptedMessage))
                throw new ArgumentException("Encrypted Message Required!", "pEncryptedMessage");

            var message = Convert.FromBase64String(pEncryptedMessage);
            using (var hmac = new HMACSHA256(pAuthKey))
            {
                var sentTag = new byte[hmac.HashSize / 8];
                //Calculate Tag
                var calcTag = hmac.ComputeHash(message, 0, message.Length - sentTag.Length);
                var ivLength = (BlockBitSize / 8);

                //if message length is to small just return null
                if (pEncryptedMessage.Length < sentTag.Length + pNonSecretPayloadLength + ivLength)
                    return null;

                //Grab Sent Tag
                Array.Copy(message, message.Length - sentTag.Length, sentTag, 0, sentTag.Length);

                //Compare Tag with Constant time comparison
                var auth = true;
                for (var i = 0; i < sentTag.Length; i++)
                    auth = auth & sentTag[i] == calcTag[i]; //uses non-shortcircuit and (&)

                //if message doesn't authenticate return null
                if (!auth)
                    return null;

                using (var aes = new AesManaged
                {
                    KeySize = KeyBitSize,
                    BlockSize = BlockBitSize,
                    Mode = CipherMode.CBC,
                    Padding = PaddingMode.PKCS7
                })
                {

                    //Grab IV from message
                    var iv = new byte[ivLength];
                    Array.Copy(message, pNonSecretPayloadLength, iv, 0, iv.Length);

                    using (var decrypter = aes.CreateDecryptor(pCryptKey, iv))
                    using (var plainTextStream = new MemoryStream())
                    {
                        using (var decrypterStream = new CryptoStream(plainTextStream, decrypter, CryptoStreamMode.Write))
                        using (var binaryWriter = new BinaryWriter(decrypterStream))
                        {
                            //Decrypt Cipher Text from Message
                            binaryWriter.Write(
                                message,
                                pNonSecretPayloadLength + iv.Length,
                                message.Length - pNonSecretPayloadLength - iv.Length - sentTag.Length
                            );
                        }
                        //Return Plain Text
                        return Encoding.UTF8.GetString(plainTextStream.ToArray());
                    }
                }
            }
        }

    }
}
