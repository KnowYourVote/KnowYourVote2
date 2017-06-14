using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace KnowYourVote2.Models
{
    public class KnowYourVote2Context : DbContext
    {
        // You can add custom code to this file. Changes will not be overwritten.
        // 
        // If you want Entity Framework to drop and regenerate your database
        // automatically whenever you change your model schema, please use data migrations.
        // For more information refer to the documentation:
        // http://msdn.microsoft.com/en-us/data/jj591621.aspx
    
        public KnowYourVote2Context() : base("name=KnowYourVote2Context")
        {
        }

        public System.Data.Entity.DbSet<KnowYourVote2.Models.User> Users { get; set; }

        public System.Data.Entity.DbSet<KnowYourVote2.Models.Favorite> Favorites { get; set; }

        public System.Data.Entity.DbSet<KnowYourVote2.Models.Politician> Politicians { get; set; }

        public System.Data.Entity.DbSet<KnowYourVote2.Models.Comment> Comments { get; set; }
    }
}
