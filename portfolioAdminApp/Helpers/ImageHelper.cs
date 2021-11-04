using System;
using System.IO;

namespace portfolioAdminApp.Helpers
{
    public class ImageHelper
    {
       public static string ConvertToDataUrl (string relativePath) {
        string fullPath = Path.Combine(Directory.GetCurrentDirectory(), @"\Media\" + relativePath);
        Byte[] bytes = File.ReadAllBytes(fullPath);
        return Convert.ToBase64String(bytes);
        }
    }        
}
