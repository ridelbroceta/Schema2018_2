

using App.BusinessLayer.Domain;

namespace App.BusinessLayer.Contracts.WriteServices
{
    //not for Entity, not Generic

    public interface IWriteEntityTestService
    {
        void Add();
        int Save(EntityTest entityTest);
    }
}