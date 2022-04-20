import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { PostService } from 'src/app/Services/post-service';

@Component({
  selector: 'app-sign-up-workers',
  templateUrl: './sign-up-workers.component.html',
  styleUrls: ['./sign-up-workers.component.css']
})
export class SignUpWorkersComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private apiService: PostService) { }

  ngOnInit(): void {
  }

  get workerID(){
    return this.registerForm.get('workerid');
  }
  get nameWorker(){
    return this.registerForm.get('nameworker');
  }
  get lastNameWorker(){
    return this.registerForm.get('lastnameworker');
  }
  get passWorker(){
    return this.registerForm.get('passworker');
  }
  get workers(){
    return this.registerForm2.get('Workers') as FormArray;
  }
  registerForm = this.formBuilder.group({
    workerid: [0, Validators.required],
    nameworker: ['', Validators.required],
    lastnameworker: ['', Validators.required],
    passworker: ['',Validators.required],
  });

  registerForm2 = this.formBuilder.group({
    Workers:this.formBuilder.array([])
  });

  addWorkers(){
    const workersFormGroup = this.formBuilder.group({
      workerid: 0,
      nameworker: '',
      lastnameworker: '',
      passworker: ''
    });
    this.workers.push(workersFormGroup);
  }

  removeWorkers(index : number){
    this.workers.removeAt(index);
  }

  submit(){
    if(!this.registerForm.valid){
      alert("ERROR");
      return;
    }
    else{
      console.log(this.registerForm.value)
      this.apiService.addWorker(this.registerForm.value).subscribe(
        res => {
          console.log(res);
        }
      );
      if(this.workers.length != 0){
        this.apiService.addWorker(this.workers.value).subscribe(
          res => {
            console.log(res);
          }
        );
      }

      
      
    }
  }
}
