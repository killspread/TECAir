import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetService } from 'src/app/Services/get-service';
import { FlightModel } from '../../models/flight.model';
import { CookieService } from 'ngx-cookie-service';
import { UserInFlightModel } from '../../models/user-in-flight-model';
import { PostService } from 'src/app/Services/post-service';
@Component({
  selector: 'app-payment-confirmation',
  templateUrl: './payment-confirmation.component.html',
  styleUrls: ['./payment-confirmation.component.css']
})
export class PaymentConfirmationComponent implements OnInit {

  Flight: FlightModel = {
    origin: '',
    destination: '',
    bagquantity: 0,
    userquantity: 0,
    flightid: '',
    departure: '',
    arrival: '',
    price: 0,
    stops: [],
    gate: 0,
    status: '',
    discount: 0,
    planeid: '',
    workerid: 0
  }
  customerInFlight: UserInFlightModel = {
    customerid: 0,
    flightid: '',
    seatnum: 0
  }
  nameCustomer = this.cookieSvc.get('CustomerName');
  lastNameCustomer = this.cookieSvc.get('CustomerLN');
  numAsiento = this.cookieSvc.get("seatNumber");
  Status = false;

  /**
   * Constructor method
   * @param cookieSvc 
   * @param apiService 
   * @param router 
   * @param postSvc 
   */
  constructor(private cookieSvc:CookieService, private apiService:GetService, private router:Router, private postSvc:PostService) {
    //Method for asking the API for the information of the flight
  }

  /**
   * Method to be executed at component startup
   */
  ngOnInit(): void {
    this.getFlight();
  }

/***
 * get the required flight from the api
 */
  getFlight(){
    this.apiService.getFlight(this.cookieSvc.get('FlightID')).subscribe(
      res => {
        this.Flight = res;
        this.Status = true;
      }, 
      err =>{
        alert("Ha ocurrido un error")
      }
    );
  }

  /**
   * Create the user in flight
   */
  checkPago(){
    this.customerInFlight.customerid = parseInt(this.cookieSvc.get('CustomerID'));
    this.customerInFlight.flightid = this.cookieSvc.get('FlightID');
    console.log(this.customerInFlight)
    this.postSvc.addCustomerInFlight(this.customerInFlight).subscribe(
      res =>{
        this.router.navigate(["asientos"]);
      }, err => {
        alert("Ha ocurrido un error")
      }
    );
    }
    home(){
      this.customerInFlight.customerid = parseInt(this.cookieSvc.get('CustomerID'));
      this.customerInFlight.flightid = this.cookieSvc.get('FlightID');
      console.log(this.customerInFlight)
      this.postSvc.addCustomerInFlight(this.customerInFlight).subscribe(
        res =>{
          this.router.navigate(["home"]);
        }, err => {
          alert("Ha ocurrido un error")
        }
      );
      }
  }
