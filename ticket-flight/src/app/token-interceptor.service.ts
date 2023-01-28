import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedServiceService } from './shared-service.service';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {

  constructor(private inject: Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authservice = this.inject.get(SharedServiceService)
    const isLoginUrl = req.url.includes('/token/login')

    if (authservice && !isLoginUrl) {
      let token = req.clone({
        setHeaders: {
          Authorization: 'Token ' + authservice.GetToken()
        }
      });
      return next.handle(token);
    }
    return next.handle(req);
  }

}