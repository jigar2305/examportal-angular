import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  userform: FormGroup; 
  constructor(private tostr:ToastrService,private router:Router,private userservice:UserService) { 
    this.userform = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      gender: new FormControl(''),

    })
  }

  ngOnInit(): void {
  }
  adduser(){
    this.userservice.signupApi(this.userform.value).subscribe(res=>{
      this.tostr.success("signup success")
    },err=>{
      this.tostr.success(err)
      console.log(err);
      
    })
  }

}
