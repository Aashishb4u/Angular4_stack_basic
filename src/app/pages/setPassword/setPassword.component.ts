import {Component, ViewEncapsulation, ViewContainerRef, ViewChildren} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router}  from '@angular/router';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import {AuthenticationHelper} from '../../app.authentication';
import {BaThemeSpinner} from '../../theme/services';
import {EqualPasswordsValidator} from '../../theme/validators';
import {AppConstant} from "../../app.constant";
import {ApplicationAdminServices} from '../../appServices/application';

@Component({
    selector: 'setPassword',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './setPassword.html',
    styleUrls: ['./setPassword.scss']
})

export class setPassword extends AppConstant {
    form: FormGroup;
    submitted: boolean = false;
    data: any;
    isLoggedIn: boolean = false;
    @ViewChildren('confirmationCode') confirmationCode;
    constructor(fb: FormBuilder, private router: Router, private appService: ApplicationAdminServices,
                public toastr: ToastsManager, vRef: ViewContainerRef, private _spinner: BaThemeSpinner,
                private authentication: AuthenticationHelper) {
        super();
        this.form = fb.group({
            'confirmResetCode': ['', Validators.compose([Validators.required])],
            'passwords': fb.group({
                'password': ['', Validators.compose([Validators.required, Validators.minLength(8)])],
                'confirmPassword': ['', Validators.compose([Validators.required, Validators.minLength(8)])]
            }, {validator: EqualPasswordsValidator.validate('password', 'confirmPassword')})
        });
    }


    ngAfterViewInit() {
        this.confirmationCode.first.nativeElement.focus();
    }
    //onSubmit
    onSubmit(values: any): void {
        this._spinner.show();
        let setPasswordData = {
            "password": values.passwords.password,
            "verificationCode": values.confirmResetCode
        };
        // Api call to forgot password, if success forgotPasswordSuccess(data) and if error forgotPasswordFail(error)
        this.appService.setPassword(setPasswordData).subscribe(
            data => this.setPasswordSuccess(data),
            error => this.setPasswordFail(error)
        );
    }

    /**
     * if set password success
     * @param result
     */
    setPasswordSuccess(result) {
        // this.router.navigate(['/login']);

        this._spinner.hide();
        this.authentication.setToken(result.success.data.token);
        this.isLoggedIn = true;
        this.authentication.setIsLoggedIn(true);
        this.authentication.setUserLocal(result);
        this.toastr.success('Password set successfully and Logged in.');
        this.router.navigate(['/dashboard']);
    }

    /**
     * if set password fails
     * @param Error
     */
    setPasswordFail(Error) {
        this._spinner.hide();
        if (Error.error && Error.error.message) {
            this.toastr.error(Error.error.message);
        } else {
            this.toastr.error('Server error');
        }
    }

    /**
     * To navigate to home.
     */
    navigateToHome() {
        this.router.navigate(['']);
    }

    /**
     * To navigate to sign in.
     */
    navigateToSignIn() {
        this.router.navigate(['/login']);
    }
}
