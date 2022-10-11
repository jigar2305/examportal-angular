import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../service/user.service';

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


  login() {
    if (this.loginform.valid) {
      this.userservice.loginApi(this.loginform.value).subscribe(res => {
        localStorage.setItem("firstName",res.data.firstName)
        localStorage.setItem("userId", res.data.userId)
        localStorage.setItem("email", res.data.email)
        if (res.data.active == false) {
          this.tostr.error("please contact admin", "Your account is deactivate");
        } else {
          this.tostr.success("login successfully")
          if (res.data.role.roleName == 'admin') {
            this.router.navigateByUrl("/admin/dashbord")
          } else {
            this.router.navigateByUrl("/student/dashbord")
          }
        }
      }, err => {
        this.tostr.error("Incoorect email & password")
        console.log(err);
      })
    } else {
      this.tostr.error("please fill form correctly")
    }
  }


}
