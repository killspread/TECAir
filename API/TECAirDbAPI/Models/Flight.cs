﻿using System;
using System.Collections.Generic;

#nullable disable

namespace TECAirDbAPI.Models
{
    public partial class Flight
    {
        public Flight()
        {
            Bags = new HashSet<Bag>();
        }

        public string Flightid { get; set; }
        public int? Bagquantity { get; set; }
        public int? Userquantity { get; set; }
        public int Gate { get; set; }
        public DateTime Departure { get; set; }
        public DateTime Arrival { get; set; }
        public string Origin { get; set; }
        public string Destination { get; set; }
        public string Stops { get; set; }
        public string Status { get; set; }
        public decimal? Price { get; set; }
        public int? Discount { get; set; }
        public string Planeid { get; set; }
        public int? Workerid { get; set; }

        public virtual Plane Plane { get; set; }
        public virtual Worker Worker { get; set; }
        public virtual ICollection<Bag> Bags { get; set; }
    }
}
