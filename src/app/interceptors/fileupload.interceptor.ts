import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class FileuploadInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // if (request.url == 'http://localhost:9999/subject/add2') {
    //   let header = new HttpHeaders();
    //   header = header.append('content-type', 'application/json');

    //   return next.handle(request.clone({ setHeaders: {} }));
    // }

    return next.handle(request);
  }
}
