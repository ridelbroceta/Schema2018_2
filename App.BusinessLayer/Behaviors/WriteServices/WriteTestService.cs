

using App.BusinessLayer.Behaviors.Core;
using App.BusinessLayer.Contracts.Core;
using App.BusinessLayer.Contracts.WriteServices;

namespace App.BusinessLayer.Behaviors.WriteServices
{
    class WriteTestService : WriteGenericService,  IWriteTestService
    {
        public WriteTestService(IRepository repository) : base(repository)
        {
        }
    }
}
