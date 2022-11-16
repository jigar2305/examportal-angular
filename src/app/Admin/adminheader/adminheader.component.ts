import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-adminheader',
  templateUrl: './adminheader.component.html',
  styleUrls: ['./adminheader.component.css']
})
export class AdminheaderComponent implements OnInit {
  today: number = Date.now();
  firstName: any;
  email!: string;
  cPassword!: string;
  passwordform: FormGroup;
  issame:boolean = false;

  constructor(private tostr: ToastrService, private router: Router, private userservice: UserService) {
    this.passwordform = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(8), this.strongpassword]),
      cPassword: new FormControl('', [Validators.required]),
    })
  }
  ngOnInit(): void {
    this.firstName = localStorage.getItem("firstName")

  }
  forgetpassword() {
    if (this.passwordform.valid) {
      if (this.issame == false) {
        this.issame = false
        let data = {
          email: localStorage.getItem('email'),
          password: this.passwordform.value.password
        }
        console.log(data);

        this.userservice.resetpassword(data).subscribe(res => {
          this.tostr.success("Password changed successfully")
          document.getElementById('close')?.click()
        }, err => {
          this.tostr.error(err.error.msg)
        })
      }
    } else {
      this.tostr.info("please fill form correctly")

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
  checkcpassword(){
    if(this.passwordform.value.cPassword == this.passwordform.value.password){
      this.issame = false;
    }else{
      this.issame = true;
    }
  }
}
