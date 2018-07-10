using System;

namespace App.BusinessLayer.Contracts.Core
{
    public interface ITrackable
    {
        int? UserIdEnt { get; set; }

        DateTime? DateEnt { get; set; }

        int? UserIdChg { get; set; }

        DateTime? DateChg { get; set; }

    }
}