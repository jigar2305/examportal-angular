import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { map } from 'jquery';

@Injectable()
export class ToastrServiceInterceptor implements HttpInterceptor {

  constructor(private tostr:ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
          event = event.clone({body: this.modifyBody(event.body)});
      }
      return event;
  }));
  }
}
