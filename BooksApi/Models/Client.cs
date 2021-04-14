using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace ClientsApi.Models
{
    [BsonIgnoreExtraElements]
    public class Client

    {
       
        public string ClientId { get; set; }

        [BsonRequired]
        [StringLength(50, ErrorMessage = "The value cannot exceed 50 characters. ")]
        public string FirstName { get; set; }
        [StringLength(10, ErrorMessage = "The value cannot exceed 10 characters. ")]
        public string Prefix { get; set; }
        [StringLength(50, ErrorMessage = "The value cannot exceed 50 characters. ")]
        public string MiddleName { get; set; }
        [BsonRequired]
        [StringLength(50, ErrorMessage = "The value cannot exceed 50 characters. ")]
        public string LastName { get; set; }
        [StringLength(50, ErrorMessage = "The value cannot exceed 50 characters. ")]
        public string NickName { get; set; }

        public string Company { get; set; }

        public string Email { get; set; }
        [StringLength(100, ErrorMessage = "The value cannot exceed 100 characters. ")]
        public string Address { get; set; }
        [StringLength(50, ErrorMessage = "The value cannot exceed 50 characters. ")]
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
        [StringLength(30, ErrorMessage = "The value cannot exceed 30 characters. ")]
        public string PostalCode { get; set; }
        public bool IsDeactive { get; set; } 

    }
}