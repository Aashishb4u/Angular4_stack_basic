import { Component, ViewContainerRef, ViewChildren, Input } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router }  from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ApplicationAdminServices } from '../../appServices/application';
import { EmailValidator } from '../../theme/validators';
import { AuthenticationHelper } from '../../app.authentication';
import { BaThemeSpinner } from '../../theme/services';
import { AppConstant, Constants } from '../../app.constant';
declare const FB: any;
@Component({
    selector: 'login',
    templateUrl: './login.html',
    styleUrls: ['./login.scss']
})

export class Login extends AppConstant {
    @Input()
    constants: Constants;
    form: FormGroup;
    email: AbstractControl;
    password: AbstractControl;
    submitted: boolean = false;
    @ViewChildren('emailField') emailField;

    constructor(fb: FormBuilder, private router: Router, public toastr: ToastsManager,
                private appService: ApplicationAdminServices, private _spinner: BaThemeSpinner,
                private authentication: AuthenticationHelper, vRef: ViewContainerRef) {
        super();
        this.form = fb.group({
            'email': ['', Validators.compose([Validators.required, EmailValidator.validate])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(8)])]
        });

        if (this.authentication.isLoggedIn()) {
            // If token exist at localstorage then goes to dashboard.
            this.router.navigate(['dashboard']);
        } else {
            // else goes to login again.
            this.router.navigate(['login']);
        }

        FB.init({
            appId: '206515609891723',
            cookie: true,  // enable cookies to allow the server to access
            xfbml: true,  // parse social plugins on this page
            version: 'v2.8', // use graph api version 2.5
        });
    }

    /**
     * get userName and password from login page and call service
     * @param loginData
     */
    onSubmit(loginData: any): void {
        this.submitted = true;
        this._spinner.show();
        const data = {
            'email': loginData.email,
            'password': loginData.password,
        };
        this.appService.userLogin(data).subscribe(
            data => this.loginSuccess(data),
            error => this.loginFail(error),
        );
    }

    /**
     * if err
     * @param err
     */
    loginFail(err) {
        if (err.error && err.error.message) {
            this.toastr.error(err.error.message);
        } else {
            this.toastr.error('Server error');
        }
        this._spinner.hide();
        this.submitted = false;
    }
    
    /**
     * if login success
     * @param result
     */
    loginSuccess(data) {
        this.authentication.setLoggedIn(data);
        this._spinner.hide();
        this.toastr.success('Login Successful');
        this.router.navigate(['dashboard']);
    }

    /**
     *  To navigate to sign up page.
     */
    navigateToSignUp() {
        this.router.navigate(['/signup']);
    }

    /**
     *  To navigate to forgot password page.
     */
    navigateToForwardPassword() {
        this.router.navigate(['/forgot-password']);
    }

    onFacebookLoginClick() {
        this._spinner.show();
        FB.login(
            (response) => {
                this.statusChangeCallback(response);

            }, { scope: 'email', return_scopes: true },
        );
    }

    // Function for send facebook data to server

    statusChangeCallback(resp) {

        if (resp.status === 'connected') {
            const self = this;
            FB.api('/me?fields=id,name,email,first_name,last_name,gender,' +
                'picture.width(150).height(150),age_range,friends',
                function (result) {
                    const signUpData = {
                        'first_name': result.first_name.trim(),
                        'last_name': result.last_name.trim(),
                        'email': result.email,
                        'device_token': '6a0974954e45d826239fc3c150734619745ca33e',
                        'ud_id': '12345678',
                        'device_os': 'ios',
                        'profileImageURL': result.picture.data.url,
                    };
                    self._spinner.hide();
                    self.appService.loginWithFacebook(signUpData).subscribe(
                        (next: any) => {
                            self.loginSuccess(next);
                            // console.log(next,'dws');
                            // // if (next) {
                            // //     self._spinner.hide();
                            // //     self.toastr.success('SignUp Successful. An email has been' +
                            // //         ' sent to your email id. Please verify before sign in.');
                            // //     self.router.navigate(['/login']);
                            // // }
                         },
                        (Error: any ) => {
                            self._spinner.hide();
                                 if (Error.error && Error.error.message) {
                                     self.toastr.error(Error.error.message);
                                 } else {
                                     self.toastr.error('Server error');
                                 }
                            }
                    );
                });
        } else if (resp.status === 'not_authorized') {
            FB.resetFB();
            this.toastr.error(this.constants.FBERROR);
        } else {
            FB.resetFB();
            this.toastr.error(this.constants.FBALERT);
        }

    }
}