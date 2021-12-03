import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()

export class JwtInterceptor implements HttpInterceptor {
  
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let userToken = localStorage.getItem("user_token");

    if (userToken === null) {
      userToken = sessionStorage.getItem("user_token");
    }

    if (userToken !== null) {
      request = request.clone({
        setHeaders: {
          Authorization: "Bearer " + userToken,
        },
      });
    }

    return next.handle(request);
  }
}
