import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpParams
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "./authservice";
import {exhaustMap, take} from "rxjs/operators";

@Injectable()
export class AuthinterceptorserviceInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        if(!user) {
          return next.handle(request);
        }
        let token = user.token ? user.token : '';
        const modifiedRequest = request.clone({params: new HttpParams().set('auth', token)});
        return next.handle(modifiedRequest);
      }));
  }
}
