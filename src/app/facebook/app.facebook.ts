import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
declare const FB: any;

@Injectable()
export class FacebookHelper {
    constructor() {
        this.resetFB();
    }

    resetFB() {
        FB.init({
            appId: '206515609891723',
            cookie: true,  // enable cookies to allow the server to access
            xfbml: true,  // parse social plugins on this page
            version: 'v2.8', // use graph api version 2.5
        });
    }

    login(): Observable<any> {
        return FB.login(
            (response) => {
            }, { scope: 'email', return_scopes: true },
        );
    }
}
