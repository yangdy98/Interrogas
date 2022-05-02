using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Candidates

{
    public class CandidateAddRequest
    {
        [Required]
        [MinLength(2), MaxLength(100)]
        public string Name { get; set; }
        [Required]
        [MinLength(2), MaxLength(100)]
        public string Surnames { get; set; }
        [Required]
        public string GenderType { get; set; }
        [Required]
        public int Age { get; set; }
        public string AvatarUrl { get; set; }
        [Required]
        public string Party { get; set; }
        [Required]
        public string ElectionType { get; set; }
        [Required]
        public string StatusType { get; set; }
        [Required]
        public bool IsElected { get; set; }
       
    }


}
