import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  signupApi(user:any): Observable<any>{
    return this.http.post(environment.url+"public/signup",user)
  }
  loginApi(login:any):Observable<any>{
    return this.http.post(environment.url+"public/login",login)
  }
  emailsend(email:any):Observable<any>{
    return this.http.post(environment.url+"public/otpsend",email)
  }
  checkotp(otpbean:any):Observable<any>{
    return this.http.post(environment.url+"public/otp",otpbean)
  }
  resetpassword(passwordbean:any):Observable<any>{
    return this.http.post(environment.url+"public/forgot",passwordbean)
  }
  logout(userId:any):void{
    this.http.get(environment.url+"public/logout"+userId)
  }


}
