import { ArrayType } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { GetService } from 'src/app/Services/get-service';
import { UserInFlightModel } from '../models/user-in-flight-model';
import { FlightCapModel } from '../models/flight-cap-model';
import { PutService } from 'src/app/Services/put-service';
@Component({
  selector: 'app-asientos',
  templateUrl: './asientos.component.html',
  styleUrls: ['./asientos.component.css']
})
export class AsientosComponent implements OnInit {

  customerArray: UserInFlightModel[] = [];

  capacity: FlightCapModel = {
    flightid: '',
    PassangerCap: 0
  }

  customerInFlight: UserInFlightModel ={
    customerid: 0,
    flightid: '',
    seatnum: 0
  }

  State = false;
  /**
   * Constructor Method
   */
  constructor(private cookieSvc:CookieService,private router:Router, private ApiService: GetService, private putSvc: PutService) { 
    this.getUserCapacity();
  }

  /**
   * Method to be executed at component startup
   */
  ngOnInit(){
    
    
  }

  array: Array<number> = [];
  numSeats = 0;
  arr_name:number[][]=[[]];
  cont = 0;

  /**
   * Http Get call for all the customers in flight
   */
  getUserInFlight(){
    let flight = this.cookieSvc.get("FlightID");
    this.ApiService.getCustomerInFlight(flight).subscribe(
      res =>{
        this.customerArray = res;
        this.setArray(this.customerArray);
      },
      err => {
        alert("Ha ocurrido un error")
      }
    );
  }

  /**
   * Http Get the customer capacity in a flight
   */
  getUserCapacity(){
    let flight = this.cookieSvc.get("FlightID");
    this.ApiService.getFlightCapacity(flight).subscribe(
      res =>{
        this.capacity = res;
        this.numSeats = this.capacity.PassangerCap;
        this.makeMatrix(this.numSeats)
        this.getUserInFlight();
        
      },
      err => {
        alert("Ha ocurrido un error")
      }
    );
    
  }

  /***
 * Method that creates the arrangement for the seats
 */
  setArray(customerArray:UserInFlightModel[]){
    for(let i = 0; i < customerArray.length; i++){
      this.array.push(customerArray[i].seatnum);
    }
    this.State = true;
  }
  /**
   * set the cookie for the seat number
   * @param number 
   */
  getNumber(number:Number){
    this.cookieSvc.set("seatNumber", number.toString());
  }

  /**
   * redirects to a new component add set the seatnumber to the customer
   */
  ready(){
    if(this.cookieSvc.get('seatNumber') == ''){
      alert("Debe seleccionar un asiento")
    }
    else{
      this.customerInFlight.customerid = parseInt(this.cookieSvc.get('CustomerID'));
      this.customerInFlight.flightid = this.cookieSvc.get('FlightID');
      this.customerInFlight.seatnum = parseInt(this.cookieSvc.get('seatNumber'));
      this.putSvc.setSeat(this.customerInFlight, this.cookieSvc.get('FlightID'), this.cookieSvc.get('CustomerID')).subscribe(
        res =>{
          this.router.navigate(["reservacionVuelo"]);
        }, err => {
          alert("Ha ocurrido un error")
        }
      );
      
    }
  }

  /***
   * creates the seat matrix
   */
  makeMatrix(numSeats: number){
    this.arr_name = [];
    console.log(numSeats)
    for(var i: number = 0; i < numSeats/10; i++) {
        this.arr_name[i] = [];
        for(var j: number = 0; j < 10; j++) {
          this.arr_name[i][j]=this.cont;
          this.cont+=1;
        }
    }
  }

  /**
   * verify that the seat is not occupied
   * @param valor 
   * @returns 
   */
  truth(valor:number){
    if (this.array.includes(valor)){
      return true;
    }else{
      return false;
    }
  }


}
