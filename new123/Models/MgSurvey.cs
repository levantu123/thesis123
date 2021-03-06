﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MongoDB.Driver;
using MongoDB.Bson;

namespace new123.Models
{
 
    public class Mgsurvey
    {
        public ObjectId _id { get; set; }
        public int index { get; set; }
        public string sname { get; set; }     
        public string shortdescription { get; set; }
        public int nextqid { get; set; }
        public page[] pages { get; set; }
        public string jsonstr()
        {
            return "{\"index\":"+this.index.ToJson()+", \"sname\": " + this.sname.ToJson() + ", \"shortdescription\": " + this.shortdescription.ToJson() + ", \"nextqid\": " + this.nextqid.ToJson() + ", \"pages\": " + this.pages.ToJson()+"}";
        }
    }


    public class page
    {
        public string page_title { get; set; }
        public string shortdescription { get; set; }
        public question[] questions { get; set; }
        public int doafter { get; set; }
    }
    public class question
    {
        public int qid { get; set; }
        public string qtype { get; set; }
        public string btype { get; set; }
        public string title { get; set; }
        public bool useshortdescription { get; set; }
        public string shortdescription { get; set; }
        public bool isrequired { get; set; }
        public bool nextpagedetect { get; set; }
        public bool isscored { get; set; }
        public choice[] choices { get; set; }
        public word[] row { get; set; }
        public word[] column { get; set; }
        public requiredcontent requiredcontent { get; set; }
    }
    public class choice
    {
        public string choice_value { get; set; }
        public int nextpage { get; set; }
        public double score { get; set; }
    }
    
    public class requiredcontent
    {
        public bool used { get; set; }
        public int min { get; set; }
        public int max { get; set; }
        public string inputtype { get; set; }
        public int nmin { get; set; }
        public int nmax { get; set; }
        public double step { get; set; }
        public string maxday { get; set; }
        public string minday { get; set; }
        public word [] must { get; set; }
        public word [] mustnot { get; set; }
    }
    public class word
    {
        public string svalue { get; set; }
    }
}