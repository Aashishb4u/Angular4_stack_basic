import {Component, ViewEncapsulation, ViewContainerRef, ViewChildren} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router}  from '@angular/router';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import {BaThemeSpinner} from '../../theme/services';
import {EmailValidator, EqualPasswordsValidator} from '../../theme/validators';
import {BlankSpaceValidator} from '../../theme/validators/blank.validator';
import {AppConstant} from "../../app.constant";
import {ApplicationAdminServices} from '../../appServices/application';

@Component({
    selector: 'signUp',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './signUp.html',
    styleUrls: ['./signUp.scss']
})

export class signUp extends AppConstant {
    form: FormGroup;
    submitted: boolean = false;
    data: any;
    @ViewChildren('firstName') firstField;

    constructor(fb: FormBuilder, private router: Router, private appService: ApplicationAdminServices,
                public toastr: ToastsManager, vRef: ViewContainerRef, private _spinner: BaThemeSpinner) {
        super();
        this.form = fb.group({
            'firstName': ['', Validators.compose([Validators.required,BlankSpaceValidator.validate ])],
            'lastName': ['', Validators.compose([Validators.required,BlankSpaceValidator.validate])],
            'email': ['', Validators.compose([Validators.required, EmailValidator.validate])],
        });
    }

    ngAfterViewInit() {
        this.firstField.first.nativeElement.focus();
    }

    //onSubmit
    onSubmit(value: any): void {
        this._spinner.show();
        let signUpData = {
            'first_name': value.firstName.trim(),
            'last_name': value.lastName.trim(),
            'email': value.email,
            // 'password': value.passwords.password,
            'device_token': '6a0974954e45d826239fc3c150734619745ca33e',
            'ud_id': '12345678',
            'device_os': 'ios',
        };

        // Api call to sign up, if success signUpSuccess(data) and if error signUpFail(error)
        this.appService.userSignUp(signUpData).subscribe(
            data => this.signUpSuccess(data),
            error => this.signUpFail(error)
        );
    }

    /**
     * if signup success
     * @param data
     */
    signUpSuccess(data) {
        if(data){
            this._spinner.hide();
            this.toastr.success('SignUp Successful. An email has been sent to your email id. Please verify before sign in.');
            this.router.navigate(['/login']);
        }
    }

    /**
     * if signup fail
     * @param Error
     */
    signUpFail(Error) {
        this._spinner.hide();
        if (Error.error && Error.error.message) {
            this.toastr.error(Error.error.message);
        } else {
            this.toastr.error('Server error');
        }
    }

    /**
     *  To navigate to forgot password page.
     */
    navigateToForgotPassword() {
        this.router.navigate(['/forgot-password']);
    }

    /**
     *  To navigate to Home page.
     */
    navigateToHome() {
        this.router.navigate(['']);
    }

    /**
     *  To navigate to sign in page.
     */
    navigateToSignIn() {
        this.router.navigate(['/login']);
    }

    trimContent(value, control) {
        if(value) {
            this.form.controls[control].setValue(value.trim());
        }
        return value.trim();

    }
    

}
