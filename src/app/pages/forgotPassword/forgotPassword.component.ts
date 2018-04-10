import {Component, ViewEncapsulation, ViewContainerRef, ViewChildren} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router}  from '@angular/router';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import {AuthenticationHelper} from '../../app.authentication';
import {BaThemeSpinner} from '../../theme/services';
import {EmailValidator} from '../../theme/validators/email.validator';
import {AppConstant} from "../../app.constant";
import {ApplicationAdminServices} from '../../appServices/application';

@Component({
    selector: 'forgotPassword',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './forgotPassword.html',
    styleUrls: ['./forgotPassword.scss']
})

export class forgotPassword extends AppConstant {
    form: FormGroup;
    submitted: boolean = false;
    data: any;
    @ViewChildren('emailField') emailField;

    constructor(fb: FormBuilder, private router: Router, private appService: ApplicationAdminServices,
                public toastr: ToastsManager, vRef: ViewContainerRef, private _spinner: BaThemeSpinner,
                private authentication: AuthenticationHelper) {
        super();
        this.form = fb.group({
            'email': ['', Validators.compose([Validators.required, EmailValidator.validate])],
        });
    }

    ngAfterViewInit() {
        this.emailField.first.nativeElement.focus();
    }
    //onSubmit
    onSubmit(values: any): void {
        let userEmail = {
            email: values.email
        };
        // Api call to generate code, if success generateCodeSuccess(data) and if error generateCodeFail(error)
        this.appService.generateCode(userEmail).subscribe(
            data => this.generateCodeSuccess(data),
            error => this.generateCodeFail(error)
        );
    }

    //if generate code success
    generateCodeSuccess(data) {
        this.router.navigate(['/reset-password']);
        this.toastr.success(data.success.data.message);
    }

    //if generate code fail
    generateCodeFail(Error) {
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

    navigateToResetPassword() {
        this.router.navigate(['/reset-password']);
    }
}
