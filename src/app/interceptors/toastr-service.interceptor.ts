import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { catchError, map, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class ToastrServiceInterceptor implements HttpInterceptor {

  constructor(private tostr: ToastrService) { }
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.startsWith(environment.url)) {
      return next.handle(request).pipe(map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          let apicode = event.body.apicode;
          let msg = event.body.msg;
          let msgstring = msg as string;
          msgstring = msgstring.toLowerCase();
          switch (apicode) {
            case 200:
              if (!msgstring.includes("get") && !msgstring.includes("list") && !msgstring.includes("fetch") && msgstring != null) {
                this.tostr.success(msg)
              }
              break;
            case 404:
              this.tostr.warning(msg)
              break;
            case 500:
              this.tostr.error('please try again', msg)
              break;
            case 401:
              this.tostr.error(msg)
              break;
            default:
              break;
          }
          if (event.status == 401) {
            this.tostr.error("Please Login before access service")
          } else if (event.status == 500) {
            this.tostr.error("Technical Error accoured")
          }
        }
        return event;
      })
      );
    }
    return next.handle(request);
  }
}
