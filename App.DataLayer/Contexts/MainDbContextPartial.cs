using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;

using App.BusinessLayer.Contracts.Core;

namespace App.DataLayer.Contexts
{
    public partial class MainDbContext : IUnityOfWork
    {
        public void Save()
        {
            try
            {
                SaveChanges();
            }
            catch (DbEntityValidationException e)
            {

                var outputLines = new List<string>();
                foreach (var eve in e.EntityValidationErrors)
                {
                    outputLines.Add($"{DateTime.Now}: Entity of type \"{eve.Entry.Entity.GetType().Name}\" in state \"{eve.Entry.State}\" has the following validation errors:");
                    foreach (var ve in eve.ValidationErrors)
                    {
                        outputLines.Add($"- Property: \"{ve.PropertyName}\", Error: \"{ve.ErrorMessage}\"");
                    }
                }
                System.IO.File.AppendAllLines(@"C:\errors.txt", outputLines);

                throw;
            }
        }
    }
}
