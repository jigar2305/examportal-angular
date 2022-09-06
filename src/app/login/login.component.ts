import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginform: FormGroup;
  otpsend: FormGroup;
  emailPattern = "^[a-z0-9]+@gmail.com";
  display: boolean = false;

  constructor(private tostr: ToastrService, private router: Router, private userservice: UserService) {
    this.loginform = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
      password: new FormControl('', [Validators.required]),

    })
    this.otpsend = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
    })
  }

  ngOnInit(): void {
  } 
  otpsende() {
    console.log(this.otpsend.value);
    if (this.otpsend.valid) {
      this.userservice.emailsend(this.otpsend.value).subscribe(res => {
        this.tostr.success("otp send successfully")
        localStorage.setItem("email", this.otpsend.value.email)
        this.router.navigateByUrl("/forgot")
      }, err => {
        this.tostr.error("something went wrong")
        console.log(err);
      })
    } else {
      this.tostr.error("please check email")
    }
  }


  showDialog() {
    this.display = true;
    document.getElementById("login")?.setAttribute("style", "display:none")
  }

  login() {
    if (this.loginform.valid) {
      this.userservice.loginApi(this.loginform.value).subscribe(res => {
        this.tostr.success("login success")
        if (res.data.role.roleName == 'admin') {
          this.router.navigateByUrl("/admin/dashbord")
        }else{
          this.router.navigateByUrl("/home")
        }
      }, err => {
        this.tostr.error("something went wrong")
        console.log(err);
      })
    } else {
      this.tostr.error("please fill form correctly")
    }
  }


}
