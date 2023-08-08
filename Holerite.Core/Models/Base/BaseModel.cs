using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;

namespace Holerite.Core.Models.Base
{
    public class BaseModel
    {
        public BaseModel()
        {
            Id = Guid.NewGuid();
        }

        public BaseModel(DateTime created) : this()
        {
            Created = created;
        }

        public BaseModel(Guid id, DateTime created)
        {
            Id = id;
            Created = created;
        }

        [Key]
        public Guid Id { get; set; }
        public DateTime? Created { get; set; }
        public DateTime? Updated { get; set; }
        public DateTime? Deleted { get; set; }
    }
}
