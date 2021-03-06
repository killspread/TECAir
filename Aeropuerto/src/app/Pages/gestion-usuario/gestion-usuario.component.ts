import { Component, OnInit } from '@angular/core';
import { CustomerModel } from '../models/customer';
import { PostService } from 'src/app/Services/post-service';

@Component({
  selector: 'app-gestion-usuario',
  templateUrl: './gestion-usuario.component.html',
  styleUrls: ['./gestion-usuario.component.css']
})
export class GestionUsuarioComponent implements OnInit {

  /**
   * Constructor Method
   * @param apiService 
   */
  constructor(private apiService: PostService){}
    newUser: CustomerModel={
    customerid: 0,
    namecustomer: "",
    lastnamecustomer: "",
    passcustomer: "",
    email: "",
    phone: 0,
    studentid: 0,
    university: "",
    miles: 0
  }
  /**
   * Method to be executed at component startup
   */
  ngOnInit(): void {
  }
  /**
   * @description: Method for adding new users to the DB
   */
   SignUpUser(){
    this.apiService.addCustomer(this.newUser).subscribe(
      res =>{
        location.reload();
      }, err => {
        alert("Ha ocurrido un error")
      }
    );
  }
}
