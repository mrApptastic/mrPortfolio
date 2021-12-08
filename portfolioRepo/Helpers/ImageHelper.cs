using System;
using System.IO;

namespace PortfolioRepo.Helpers
{
    public class ImageHelper
    {
       public static string ConvertToDataUrl (string relativePath) {
        string type = relativePath.Split(".")[1].ToLower();
        string mediaFolder = Path.Combine("Media", relativePath);
        string fullPath = Path.Combine(Directory.GetCurrentDirectory(), mediaFolder);
        Byte[] bytes = File.ReadAllBytes(fullPath);
        return getPrefix(type) + Convert.ToBase64String(bytes);
        }

        private static string getPrefix(string type) {
            switch (type) {
                case "png": return "data:image/png;base64,";
                case "gif": return "data:image/gif;base64,";
                case "svg": return "data:image/svg+xml;base64,";
                default: return "data:image/jpg;base64,";
            }
        }
    }        
}
