import {Component, ViewEncapsulation, ViewContainerRef, ViewChildren} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {Router}  from '@angular/router';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import {AuthenticationHelper} from '../../app.authentication';
import {BaThemeSpinner} from '../../theme/services';
import {EmailValidator, EqualPasswordsValidator} from '../../theme/validators';
import {AppConstant} from "../../app.constant";
import {ApplicationAdminServices} from '../../appServices/application';

@Component({
    selector: 'resetPassword',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './resetPassword.html',
    styleUrls: ['./resetPassword.scss']
})

export class resetPassword extends AppConstant {
    form: FormGroup;
    submitted: boolean = false;
    data: any;
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

    //onSubmit
    onSubmit(values: any): void {
        let resetPasswordData = {
            "password": values.passwords.password,
            "verificationCode": values.confirmResetCode
        };
        // Api call to forgot password, if success forgotPasswordSuccess(data) and if error forgotPasswordFail(error)
        this.appService.forgotPassword(resetPasswordData).subscribe(
            data => this.forgotPasswordSuccess(data),
            error => this.forgotPasswordFail(error)
        );
    }

    ngAfterViewInit() {
        this.confirmationCode.first.nativeElement.focus();
    }

    forgotPasswordSuccess(data) {
        this.router.navigate(['/login']);
        this.toastr.success(data.success.data.message);
    }

    forgotPasswordFail(Error) {
        if (Error.error && Error.error.message) {
            this.toastr.error(Error.error.message);
        } else {
            this.toastr.error('Server error');
        }
    }

    navigateToHome() {
        this.router.navigate(['']);
    }

    navigateToSignIn() {
        this.router.navigate(['/login']);
    }
}
