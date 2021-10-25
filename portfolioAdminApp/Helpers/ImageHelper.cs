using System;
using System.IO;

namespace portfolioAdminApp.Helpers
{
    public class ImageHelper
    {
       public static string ConvertToDataUrl (string relativePath) {
        Byte[] bytes = File.ReadAllBytes(relativePath);
        return Convert.ToBase64String(bytes);
        }
    }        
}
