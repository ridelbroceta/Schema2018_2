using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace App.BusinessLayer.Domain
{

    public class BaseTrack 
    {

        #region Log

        [Column("USER_ENT_BY")]
        [StringLength(60)]
        public string UserEntBy { get; set; }

        [Column("USER_SEQ_ENT_BY")]
        public int? UserIdEnt { get; set; }

        [Column("DT_ENT")]
        public DateTime DtEnt { get; set; }

        [StringLength(60)]
        [Column("USER_CHG_BY")]
        public string UserChgBy { get; set; }

        [Column("USER_SEQ_CHG_BY")]
        public int? UserIdChg { get; set; }

        [Column("DT_CHG")]
        public DateTime? DtChg { get; set; }

        [Column("DUE_DATE")]
        public DateTime? DueDate { get; set; }

        #endregion
    }

  
}
