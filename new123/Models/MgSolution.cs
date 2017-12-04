using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MongoDB.Driver;
using MongoDB.Bson;


namespace new123.Models
{
    public class MgSolution
    {
        public ObjectId _id { get; set; }
        public int index { get; set; }
        public response[] responses { get; set; }
   
        public string jsonstr()
        {
            return "{\"index\":" + this.index.ToJson() + ", \"responses\": " + this.responses.ToJson() + "}";
        }
    }
    public class response
    {
        public string Timestamp { get; set; }
        public Answer[] answers { get; set; }

    }
    public class Answer
    {
        public string text { get; set; }
    }
}