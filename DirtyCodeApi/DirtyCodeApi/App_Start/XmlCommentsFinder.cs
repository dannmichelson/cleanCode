using System;
using System.IO;
using System.Reflection;

namespace DirtyCodeApi
{
    public class XmlCommentsFinder
    {
        public static string GetXmlComments()
        {
            var baseDirectory = AppDomain.CurrentDomain.BaseDirectory;
            var commentsFileName = Assembly.GetExecutingAssembly().GetName().Name + ".XML";
            var commentsFile = Path.Combine(baseDirectory, "bin", commentsFileName);

            return commentsFile;
        }
    }
}