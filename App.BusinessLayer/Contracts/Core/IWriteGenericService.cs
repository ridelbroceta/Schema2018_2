
namespace App.BusinessLayer.Contracts.Core
{
    public interface IWriteGenericService
    {
        void DeleteBy<T>(params object[] keyValues) where T : class;

    }
}