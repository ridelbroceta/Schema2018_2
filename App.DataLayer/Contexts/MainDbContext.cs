using System;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using App.BusinessLayer.Contracts.Core;

namespace App.DataLayer.Contexts
{
    public class MainDbContext : DbContext
    {

        public MainDbContext() : base("name=MainDbContext")
        {
            Database.SetInitializer<MainDbContext>(null);

            Configuration.LazyLoadingEnabled = false;
            Configuration.ProxyCreationEnabled = false;
        }
        
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            //modelBuilder.HasDefaultSchema("EPRR");
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();


            //modelBuilder.Entity<Request>()
            //               .Property(e => e.PrrPrefix)
            //               .IsFixedLength();


            //modelBuilder.Entity<TaskReason>()
            //           .HasRequired(s => s.Reason)
            //           .WithMany(p => p.TaskReasons)
            //           .WillCascadeOnDelete(false);

            //this part is for no create tables for the view properties

            //modelBuilder.Types<Request>()
            //               .Configure(c => c.Ignore(p => p.Department));

            //modelBuilder.Types<Task>()
            //    .Configure(c => c.Ignore(p => p.Department));

            //modelBuilder.Types<Task>()
            //    .Configure(c => c.Ignore(p => p.Division));

            //modelBuilder.Types<Task>()
            //    .Configure(c => c.Ignore(p => p.Person));

            //modelBuilder.Types<ExternalAgency>()
            //    .Configure(c => c.Ignore(p => p.Department));

            //modelBuilder.Types<ActionType>()
            //    .Configure(c => c.Ignore(p => p.Department));

            //modelBuilder.Types<ActionTypeTemplate>()
            //    .Configure(c => c.Ignore(p => p.Department));

            //modelBuilder.Types<EmailTemplateType>()
            //    .Configure(c => c.Ignore(p => p.Department));

            base.OnModelCreating(modelBuilder);

        }

        // Override SaveChanges to automatically handle date and user entered/changed. Entities that require
        // this functionality must implement the ITrackable interface.
        public override int SaveChanges()
        {
            var addedTrackableEntities = ChangeTracker.Entries<ITrackable>().Where(x => x.State == EntityState.Added).Select(x => x.Entity);
            var modifiedTrackableEntities = ChangeTracker.Entries<ITrackable>().Where(x => x.State == EntityState.Modified).Select(x => x.Entity);

            var now = DateTime.Now;

            foreach (var addedEntity in addedTrackableEntities)
            {
                addedEntity.DateEnt = now;
            }

            foreach (var modifiedEntity in modifiedTrackableEntities)
            {
                modifiedEntity.DateChg = now;
            }

            return base.SaveChanges();
        }

    }
}
