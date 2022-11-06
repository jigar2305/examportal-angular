import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(request.url.includes("public")){
      return next.handle(request);
    }else{
      let authToken = localStorage.getItem("authToken") as string
      let email = localStorage.getItem("email") as string
      return next.handle(request.clone({ setHeaders: { authToken , email } }));
    }
  }
}
