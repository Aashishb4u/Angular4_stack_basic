import {Component, ViewContainerRef, ViewChildren} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms'
import {AuthenticationHelper} from "../../app.authentication";
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import {ApplicationAdminServices} from "../../appServices/application";
import {BaThemeSpinner} from "../../theme/services/baThemeSpinner/baThemeSpinner.service";
import {EmailValidator} from "../../theme/validators/email.validator";
import {Router}  from '@angular/router';
import {Utility} from "../../utilityServices/app.utility";

@Component({
    selector: 'addVendor',
    styleUrls: ['./addVendor.scss'],
    templateUrl: './addVendor.html',
    providers: [Utility]
})

export class addVendor {
    form:FormGroup;
    imageUrl:string;
    financeTab: boolean = false;
    contactTab: boolean = true;
    purchaseTab: boolean = false;
    paymentTab: boolean = false;
    numberMask: any;
    placeHolderForTag: any;
    tagsArray: any = [];
    statesData: any = [];
    deletetaglist: any = [];
    tagData: any = [];
    pinMask: any;
    contactMessage: boolean;
    pinMessage: boolean;
    @ViewChildren('vendorName') firstField;

    constructor(private fb:FormBuilder, private userUtility : Utility, private router:Router, private authentication:AuthenticationHelper, private appService:ApplicationAdminServices, public toastr:ToastsManager, vRef:ViewContainerRef, private _spinner:BaThemeSpinner) {
        this.authentication.setChangedContentTopText('Add Vendor');
        this.numberMask = [/[1-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/];
        this.pinMask = [/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/];
        this.placeHolderForTag = ' Add Categories ';
    }

    ngOnInit() {
        // window.scrollTo(0, 0);
        this.userBasicInfo();
        this.getVendorTags();
        this.loadStates();
    }

    loadStates() {
        this.userUtility.states.forEach((item: any)=>{
            this.statesData.push({ state : item})
        });
    }

    goBack() {
        this.router.navigate(['/vendors']);
    }

    changeTab(id) {
        const toggleName: any = id;
        switch (toggleName) {
            case 'contact' : {
                this.purchaseTab = false;
                this.contactTab = true;
                this.financeTab = false;
                this.paymentTab = false;
                break;
            }
            case 'finance' : {
                this.purchaseTab = false;
                this.contactTab = false;
                this.financeTab = true;
                this.paymentTab = false;
                break;
            }
            case 'purchase' : {
                this.purchaseTab = true;
                this.contactTab = false;
                this.financeTab = false;
                this.paymentTab = false;
                break;
            }
            case 'payment' : {
                this.purchaseTab = false;
                this.contactTab = false;
                this.financeTab = false;
                this.paymentTab = true;
                break;
            }
        }
    }
    
    // ngAfterViewInit() {
    //     this.firstField.first.nativeElement.focus();
    // }

    // set up form.
    userBasicInfo() {
        this.form = this.fb.group({
            'vendorName': this.fb.control('', Validators.compose([Validators.required])),
            'companyName': this.fb.control('', Validators.compose([Validators.required])),
            'phoneNumber': this.fb.control('', Validators.compose([Validators.pattern('^(0|[1-9][0-9]{9,10})$')])),
            'email': this.fb.control('', Validators.compose([Validators.required, EmailValidator.validate])),
            'AddressOne': this.fb.control(''),
            'AddressTwo': this.fb.control(''),
            'city': this.fb.control(''),
            'tags': this.fb.control([], Validators.compose([Validators.required])),
            'state': this.fb.control(''),
            'pin_code': this.fb.control('', Validators.compose([Validators.pattern('^[1-9][0-9]{5}$')])),
        });
    }

    // userBasicInfo() {
    //     this.form = this.fb.group({
    //         'vendorName': this.fb.control('', Validators.compose([Validators.required])),
    //         'companyName': this.fb.control('', Validators.compose([Validators.required])),
    //         'AddressOne': this.fb.control(''),
    //         'AddressTwo': this.fb.control(''),
    //         'phoneNumber': this.fb.control(''),
    //         'city': this.fb.control(''),
    //         'pin_code': this.fb.control(''),
    //         'email': this.fb.control('', Validators.compose([Validators.required, EmailValidator.validate])),
    //     });
    // }

    // submission of add user form.
    onSubmit(value: any): void {
        this._spinner.show();
        this.contactMessage = (value.phoneNumber.length < 10) ? true : false;
        this.pinMessage = (value.pin_code.length < 6) ? true : false;

        if (this.contactMessage || this.pinMessage) {
            this.changeTab('contact');
            this._spinner.hide();
            return;
        }
        const userData = {
            'vendor_name': value.vendorName.trim(),
            'company_name': value.companyName.trim(),
            'contact_number': value.phoneNumber.trim(),
            'email': value.email,
            'address_one': value.AddressOne,
            'address_two': value.AddressTwo,
            'city': value.city.trim(),
            'state': value.state .trim(),
            'pin_code': value.pin_code,
            'tags': value.tags,
            // 'delete_tag' : this.deletetaglist,
        };

        // Api call to edit profile, if success editUserProfile(data) and if error editUserProfileFail(error)
        this.appService.addNewVendor(userData).subscribe(
            data => this.addNewVendorSuccess(data),
            error => this.addNewVendorFail(error)
        );
    }

    addCandidatetags(event) {
    }

    removeCandidatetags(event){
        this.tagData.forEach((item: any) => {
            if (item.tag_name == event) {
                this.deletetaglist.push(item.tag_id);
            }
        });
    }

    getVendorTags() {
        this._spinner.show();
        this.appService.getAllTags().subscribe(
            data => this.getDataSuccess(data),
            error => this.getDataFail(error)
        );
    }

    getDataSuccess(res) {
        this._spinner.hide();
        this.tagsArray = [];
        res.data[0].forEach((item: any ) => {
            this.tagsArray.push(item.name);
        });
    }

    getDataFail(err) {
        this._spinner.hide();
        if (err.error && err.error.message) {
            this.toastr.error(err.error.message);
        } else {
            this.toastr.error(this.userUtility.successMessages['EXCEPTION']);
        }
    }


    //if edit profile success
    addNewVendorSuccess(result) {
        this._spinner.hide();
        this.toastr.success(this.userUtility.successMessages['ADD_VENDOR_SUCCESS']);
        // console.log("result", result);
        this.router.navigate(['/viewVendors']);
    }

    //if edit profile fail
    addNewVendorFail(Error) {
        this._spinner.hide();
        if (Error.error && Error.error.message) {
            this.toastr.error(Error.error.message);
        } else {
            this.toastr.error(this.userUtility.successMessages['ADD_VENDOR_FAIL']);
        }
    }

}
