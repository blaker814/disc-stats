using System;
using System.ComponentModel.DataAnnotations;

namespace DiscStats.Models
{
    public class Scorecard
    {
        public int Id { get; set; }

        [Required]
        public DateTime CreateDateTime { get; set; }

        [Required]
        public int CourseId { get; set; }

        public Course Course { get; set; }

        [Required]
        public int ConditionsId { get; set; }

        public Conditions Conditions { get; set; }

        [Required]
        public int UserId { get; set; }

        public User User { get; set; }
    }
}
