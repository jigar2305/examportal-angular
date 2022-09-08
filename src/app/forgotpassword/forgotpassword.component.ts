import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  emailform: FormGroup;
  resetform: FormGroup;
  display: boolean = false;

  constructor(private tostr: ToastrService, private router: Router, private userservice: UserService) {
    let email = localStorage.getItem("email")

    this.emailform = new FormGroup({
      email: new FormControl(),
      otp: new FormControl('', [Validators.required])
    })

    this.resetform = new FormGroup({
      email: new FormControl(),
      password: new FormControl('', [Validators.required,Validators.minLength(8),this.strongpassword]),
    })
    this.emailform.controls['email'].setValue(email);

  }

  showDialog() {
    this.display = true;
    document.getElementById("body")?.setAttribute("style","background-color:gray")
  }

  email1 = localStorage.getItem("email")
  ngOnInit(): void {

  }
  emailvarify() {
    console.log(this.emailform.value);
    if (this.emailform.valid) {
      this.userservice.checkotp(this.emailform.value).subscribe(res => {
        console.log(res);
        this.tostr.success(res)
        this.showDialog()
      }, err => {
        console.log(err);
        this.tostr.error(err);
      })
    }
  }
  resetpassword() {
    console.log(this.resetform.value);
    if (this.resetform.valid) {
      this.userservice.resetpassword(this.resetform.value).subscribe(res => {
        console.log(res);
        this.tostr.success(res)
    document.getElementById("body")?.setAttribute("style","background-color:white")
        this.router.navigateByUrl("/login")
      }, err => {
        console.log(err);
        this.tostr.error(err);
      })
    }

  }
  strongpassword(password: AbstractControl): ValidationErrors | null {
    let isUpper = false
    let isLower = false
    let isSpecial = false
    let isDigit = false
    let passwordValue = password.value as string

    if (passwordValue.length < 8)
      return null

    for (let i = 0; i < passwordValue.length; i++) {
      if (passwordValue.charAt(i) >= 'A' && passwordValue.charAt(i) <= 'Z') {
        isUpper = true
      } else if (passwordValue.charAt(i) >= 'a' && passwordValue.charAt(i) <= 'z') {
        isLower = true
      }
      else if (passwordValue.charAt(i) == '$' || passwordValue.charAt(i) == '#' || passwordValue.charAt(i) == '@') {
        isSpecial = true
      }
      else if (passwordValue.charAt(i) >= '0' && passwordValue.charAt(i) <= '9') {
        isDigit = true
      }
    }

    if (isLower && isUpper && isSpecial && isDigit)
      return null
    else
      return { "strongPassword": true }
  }

}
