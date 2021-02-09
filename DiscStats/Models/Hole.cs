using System.ComponentModel.DataAnnotations;

namespace DiscStats.Models
{
    public class Hole
    {
        public int Id { get; set; }

        [Required]
        public int Number { get; set; }

        [Required]
        public int Par { get; set; }

        [Required]
        public int Distance { get; set; }

        [Required]
        public int CourseId { get; set; }

        public Course Course { get; set; }
    }
}
