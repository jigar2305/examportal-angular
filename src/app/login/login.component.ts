import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthTokenService } from '../service/auth-token.service';
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

  constructor(private tostr: ToastrService, private router: Router, private userservice: UserService,private authtoken:AuthTokenService) {
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
    if (this.otpsend.valid) {
      this.userservice.emailsend(this.otpsend.value).subscribe(res => {
        this.tostr.success("otp send successfully")
        localStorage.setItem("email", this.otpsend.value.email)
        this.router.navigateByUrl("/forgot")
      }, err => {
        this.tostr.error("something went wrong")

      })
    } else {
      this.tostr.error("please check email")
    }
  }


  login() {
    if (this.loginform.valid) {
      this.userservice.loginApi(this.loginform.value).subscribe(res => {
        console.log(res.data);
        localStorage.setItem("firstName",res.data.firstName)
        localStorage.setItem("userId", res.data.userId)
        localStorage.setItem("email", res.data.email)
        localStorage.setItem('authToken',res.data.authToken)
        this.authtoken.authToken = res.data.authToken
        if (res.data.active == false) {
          this.tostr.error("please contact admin", "Your account is deactivate");
        } else {
          this.tostr.success("login successfully")
          if (res.data.role.roleName == 'admin') {
            // this.router.navigateByUrl("/admin/dashbord")
            this.router.navigateByUrl("/admin/user")
          } else {
            // this.router.navigateByUrl("/student/dashbord")
            this.router.navigateByUrl("/student/subject-pdf")
          }
        }
      }, err => {
        this.tostr.error("Incoorect email & password")
      })
    } else {
      this.tostr.error("please fill form correctly")
    }
  }


}
