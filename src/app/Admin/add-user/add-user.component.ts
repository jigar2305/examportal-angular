import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  userform: FormGroup;
  emailPattern = '^[a-z0-9]+@gmail.com';
  constructor(
    private tostr: ToastrService,
    private router: Router,
    private userservice: UserService
  ) {
    this.userform = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(this.emailPattern),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        this.strongpassword,
      ]),
      gender: new FormControl('', [Validators.required]),
    });
  }

  get email() {
    return this.userform.get('email');
  }

  ngOnInit(): void {}
  adduser() {
    if (this.userform.valid) {
      this.userservice.signupApi(this.userform.value).subscribe(
        (res) => {
          this.tostr.success("User Added");
          this.router.navigateByUrl('/user');
        },
        (err) => {
          this.tostr.error('something went wrong');
          console.log(err);
        }
      );
    } else {
      this.tostr.error('please fill form correctly');
    }
  }

  strongpassword(password: AbstractControl): ValidationErrors | null {
    let isUpper = false;
    let isLower = false;
    let isSpecial = false;
    let isDigit = false;
    let passwordValue = password.value as string;

    if (passwordValue.length < 8) return null;

    for (let i = 0; i < passwordValue.length; i++) {
      if (passwordValue.charAt(i) >= 'A' && passwordValue.charAt(i) <= 'Z') {
        isUpper = true;
      } else if (
        passwordValue.charAt(i) >= 'a' &&
        passwordValue.charAt(i) <= 'z'
      ) {
        isLower = true;
      } else if (
        passwordValue.charAt(i) == '$' ||
        passwordValue.charAt(i) == '#' ||
        passwordValue.charAt(i) == '@'
      ) {
        isSpecial = true;
      } else if (
        passwordValue.charAt(i) >= '0' &&
        passwordValue.charAt(i) <= '9'
      ) {
        isDigit = true;
      }
    }

    if (isLower && isUpper && isSpecial && isDigit) return null;
    else return { strongPassword: true };
  }
}
