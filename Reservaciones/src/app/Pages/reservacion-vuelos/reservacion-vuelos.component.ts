import { Component, OnInit, ElementRef,  ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { GetService } from 'src/app/Services/get-service';
import { FlightModel } from '../models/flight.model';
import {jsPDF} from "jspdf";
import { Router } from '@angular/router';
@Component({
  selector: 'app-reservacion-vuelos',
  templateUrl: './reservacion-vuelos.component.html',
  styleUrls: ['./reservacion-vuelos.component.css']
})
export class ReservacionVuelosComponent implements OnInit {

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
  nameCustomer = this.cookieSvc.get('CustomerName');
  lastNameCustomer = this.cookieSvc.get('CustomerLN');
  numAsiento = this.cookieSvc.get("seatNumber");
  Status = false;

  /**
   * Constructor method
   * @param cookieSvc 
   * @param apiService 
   * @param router 
   */
  constructor(private cookieSvc:CookieService, private apiService:GetService, private router:Router) {
    //Method for asking the API for the information of the flight
  }

   /**
   * Method to be executed at component startup
   */
  ngOnInit(): void {
    this.getFlight();
  }

  /**
   * get a flight from the api
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
   * make a pdf with the airline ticket
   */
  @ViewChild('content', {static: false})el!:ElementRef;
  makePDF(){
    let pdf = new jsPDF('p','pt','a4');
    pdf.html(this.el.nativeElement,{
      callback: (pdf) => {
        pdf.save("Boleto.pdf"); 
      }
    });
  }
  /**
   * Delete the customer cookies and redirect to home
   */
  home(){
    this.cookieSvc.delete("FlightID");
    this.cookieSvc.delete("seatNumber");
    this.router.navigate(["home"]);
  }
}
