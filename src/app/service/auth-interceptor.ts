import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserService } from "./user.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private userService : UserService ){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const  authToken = this.userService.getToken();

        const  authRequest = req.clone({
            headers: req.headers.set('Authorization', "Bearer " + authToken)
        });
        return next.handle(authRequest)
    }

}