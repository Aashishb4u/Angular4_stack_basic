import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthenticationHelper} from '../app.authentication';

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private authService: AuthenticationHelper, private route: Router) {
    }

    canActivate() {
        if (!this.authService.isSuperAdmin()) {
            this.route.navigate(['dashboard']);
            return false;
        } else {
            return true;
        }
    }
}
