import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Token } from '../models/token.model';
import { User } from '../models/user.model';
import { LanguageService } from '../services/language.service';
import { LoginService } from '../services/login.service';

@Injectable()
export class ApiConfInterceptor implements HttpInterceptor {

    private token: Token;
    private user: User;

    constructor(
        private loginService: LoginService,
        private languageService: LanguageService
    ) {
        // ALEMAR: See why I had to put token: any here (!)
        this.loginService.getCurrentToken().subscribe((token: any) => {
            this.token = token;
        });
        this.loginService.getCurrentUser().subscribe(user => {
            this.user = user;
        });
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let headers = {};
        let req: HttpRequest<any>;

        if (this.user && this.user.language) {
            headers['Accept-Language'] = this.user.language;
        } else if (this.languageService.language) {
            headers['Accept-Language'] = this.languageService.language;
        }

        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token.access_token}`;
        }

        req = request.clone({
            url: environment.apiBaseUrl + request.url,
            setHeaders: headers
        });

        return next.handle(req);
    }
}