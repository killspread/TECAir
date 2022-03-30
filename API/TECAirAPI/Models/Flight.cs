/// <summary>
/// Creation of Flight Model with its attributes
/// </summary>

namespace TECAirAPI.Models
{
    public class Flight
    {
        public int FlightID { get; set; } //Primary Key
        
        //Flight attributes
        public int BagQuantity { get; set; }
        public int UserQuantity {get; set;}
        public int Gate {get; set;}
        public string DepartureTime {get; set;}
        public string ArrivalTime {get; set;}
        public string Origin {get; set;}
        public string Destination {get; set;}
        public int Stops {get; set;}
        public bool Status {get; set;}
        public int Price {get; set;}
        public bool Discount{get; set;}



    }
}