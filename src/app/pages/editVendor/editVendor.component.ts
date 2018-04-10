import {Component, ViewContainerRef, ViewChildren, ViewChild} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms'
import {AuthenticationHelper} from "../../app.authentication";
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import {ApplicationAdminServices} from "../../appServices/application";
import {BaThemeSpinner} from "../../theme/services/baThemeSpinner/baThemeSpinner.service";
import {EmailValidator} from "../../theme/validators/email.validator";
import {ActivatedRoute, Router} from '@angular/router';
import {Utility} from "../../utilityServices/app.utility";
import {LocalDataSource} from "ng2-smart-table";
import {Modal} from "ng2-modal";

@Component({
    selector: 'editVendor',
    styleUrls: ['./editVendor.scss'],
    templateUrl: './editVendor.html',
    providers: [Utility],
})


export class editVendor {
    form: FormGroup;
    imageUrl: string;
    tagsArray: any = [];
    tagData: any = [];
    deletetaglist: any = [];
    numberData: any = [];
    itemNamesData: any = [];
    assignTagsArray: any = [];
    statesData: any = [];
    financeTab: boolean = false;
    contactTab: boolean = true;
    selectAll: boolean = false;
    boolMe: boolean = true;
    contactMessage: boolean;
    pinMessage: boolean;
    vendor: any;
    purchaseId: any = 123450;
    vendorData: any = [];
    financialData: any = [];
    vendorItemData: any = [];
    vendorItemDataPurchse: any = [];
    id_user: any;
    purchaseOrder: any = {
        poNumber : [],
        totalAmount : 0,
        amountRecieved : 0,
        postatus : 'Draft',
    };
    numberMask: any;
    priceMask: any;
    itemSelected: any = 'Items';
    itemPrice: any;
    deleteItemVendorId: any;
    pinMask: any;
    totalResult: any = 0;
    placeHolderForTag: any;
    id: any;
    route: any;
    purchaseTab: boolean = false;
    vendorItemsTab: boolean = false;
    paymentTab: boolean = false;
    @ViewChild('deleteVendorItemModal') deleteVendorItemModal: Modal;
    @ViewChildren('vendorName') firstField;
    source: LocalDataSource = new LocalDataSource();
    // infoSource: LocalDataSource = new LocalDataSource();

    settings: any = {
        mode: 'external',
        actions: {
            position: 'right',
            columnTitle: 'Actions',
            custom: [
                {
                    name: 'vendor_prices_route',
                    title: `<i title="Buy" class="fa fa-inr"></i>`,
                },
            ],
        },
        columns: {
            item_name: {
                title: 'Item Name',
            },
            price: {
                title: 'Price',
            },
        },

        add: {
            addButtonContent: '',
            createButtonContent: '',
            cancelButtonContent: '',
            confirmCreate: true,
        },
        edit: {
            editButtonContent: '',
            saveButtonContent: '',
            cancelButtonContent: '',
            confirmSave: true,
        },
        delete: {
            deleteButtonContent: '<i class="ion-trash-b" title="Delete Item"></i>',
            confirmDelete: true,
        },
    };

    itemVendorSettings: any = {
        selectMode: 'multi',
        actions: {
            position: 'right',
            columnTitle: 'Actions',
            // custom: [
            //     {
            //         name: 'vendor_prices_route',
            //         title: `<i title="Buy" class="fa fa-inr"></i>`,
            //     },
            // ],
        },
        columns: {
            item_name: {
                title: 'Item Name',
            },
            price: {
                title: 'Price',
            },
        },

        add: {
            addButtonContent: '',
            createButtonContent: '',
            cancelButtonContent: '',
            confirmCreate: true,
        },
        edit: {
            editButtonContent: '',
            saveButtonContent: '',
            cancelButtonContent: '',
            confirmSave: true,
        },
        delete: {
            deleteButtonContent: '<i class="ion-trash-b" title="Delete Item"></i>',
            confirmDelete: true,
        },
    };

    infoSettings: any = {
        mode: 'external',
        actions: false,
        //     {
        //     position: 'right',
        //     columnTitle: 'Actions',
        //     custom: [
        //         {
        //             name: 'vendor_prices_route',
        //             title: `<i title="Buy" class="fa fa-inr"></i>`,
        //         },
        //     ],
        // },
        columns: {
            name: {
                title: 'Title',
            },
            description: {
                title: 'Description',
            },
        },

        add: {
            addButtonContent: '',
            createButtonContent: '',
            cancelButtonContent: '',
            confirmCreate: true,
        },
        edit: {
            editButtonContent: '',
            saveButtonContent: '',
            cancelButtonContent: '',
            confirmSave: true,
        },
        delete: {
            deleteButtonContent: '<i class="ion-trash-b" title="Delete Item"></i>',
            confirmDelete: true,
        },
    };


    constructor(private routes: ActivatedRoute, private userUtility: Utility, private fb: FormBuilder, private router: Router, private authentication: AuthenticationHelper, private appService: ApplicationAdminServices, public toastr: ToastsManager, vRef: ViewContainerRef, private _spinner: BaThemeSpinner) {
        this.authentication.setChangedContentTopText('Edit Vendor');
        this.numberMask = [/[1-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/];
        this.pinMask = [/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/];
        this.placeHolderForTag = ' Add Categories ';
    }

    ngOnInit() {
        this.id = this.routes.snapshot.queryParams['id'];
        this.getVendorById(this.id);
        this.route = this.routes.snapshot.queryParams['route'];
        if (this.route == 'Buy') {
            this.changeTab('purchase');
        }

        this.userBasicInfo();
        this.getVendorTags();
        this.getItemNames();
        this.getVendorTagsById(this.id);
        this.getVendorItemsById(this.id);
        this.loadStates();
    }

    selectItemBhau(event) {
        this.itemSelected = event.target.value;
    }

    deleteItemfromPurchase(idItem, purchaseId) {
        // console.log(this.numberData, "numberdata");
        console.log('here');

        let arrayTest = Array.from(this.numberData);

        arrayTest[purchaseId][1].forEach((item: any, index: any) => {
                if ( item.id_item == idItem) {
                    console.log(item);
                    // console.log(this,'------------------------');
                            // delete ;
            arrayTest[purchaseId][1].splice(index,1);
            }
            });

        console.log(arrayTest);
    }


    deleteVendorItemButton(event) {
        this.deleteItemVendorId = event;
        this.deleteVendorItemModal.open();
    }

    deleteVendorItems() {
        const deleteId = {
            'id': this.deleteItemVendorId,
            'vendor_id': this.id,
        };
        this.appService.deleteVendorItem(deleteId).subscribe(
            data => this.deleteVendorItemsSuccess(data),
            error => this.deleteVendorItemsFail(error),
        );
    }

    onCustom(data) {
        this.changeTab('purchase');
        // if(data.action == 'buy_product_route') {
        //     this.router.navigate(['editVendor'], { queryParams: { id: data.data.id_user, route: 'Buy' } });
        // }
        // this.router.navigate(['editVendor'], { queryParams: { id: event.data.id, route: 'Buy' } });

    }

    savePurchaseOrders() {
        console.log(this.numberData);
    }

    onRowSelect(data) {
        console.log(data);
    }

    deleteVendorItemsSuccess(res) {
        if (res.code < 0) {
        } else {
            this.deleteVendorItemModal.close();
            this._spinner.hide();
            this.toastr.success(this.userUtility.successMessages['DELETE_VENDOR_ITEM_SUCCESS']);
            this.getVendorItemsById(this.id);
        }
    }

    deleteVendorItemsFail(err) {
        this.deleteVendorItemModal.close();
        this._spinner.hide();
        if (err.error && err.error.message) {
            this.toastr.error(err.error.message);
        } else if (typeof(err.error) !== 'undefined') {
            this.toastr.error(this.userUtility.successMessages['DELETE_VENDOR_ITEM_FAIL']);
        }
    }

    addPurchaseTab() {
        let total = 0;
        let data = [
            this.purchaseId,
        ];
        this.numberData.push(data);
        console.log(this.numberData,'numberData');
        this.purchaseId++;
    }

    removePurchaseTab() {
        this.numberData.pop();
    }

    editPurchaseTab() {
        this.router.navigate(['purchaseOrder'],
            { queryParams: { id: this.id, purchaseId : this.purchaseId } });
    }

    changeTab(id) {
        const toggleName: any = id;
        switch (toggleName) {
            case 'contact' : {
                this.purchaseTab = false;
                this.contactTab = true;
                this.financeTab = false;
                this.paymentTab = false;
                this.vendorItemsTab = false;
                this.totalResult = 0;
                break;
            }
            case 'finance' : {
                this.purchaseTab = false;
                this.contactTab = false;
                this.financeTab = true;
                this.paymentTab = false;
                this.vendorItemsTab = false;
                this.totalResult = 0;
                break;
            }
            case 'vendor_items' : {
                this.purchaseTab = false;
                this.contactTab = false;
                this.financeTab = false;
                this.vendorItemsTab = true;
                this.paymentTab = false;
                this.totalResult = 0;
                break;
            }
            case 'purchase' : {
                this.purchaseTab = true;
                this.contactTab = false;
                this.financeTab = false;
                this.paymentTab = false;
                this.vendorItemsTab = false;
                // this.getVendorItemsById(this.id);
                break;
            }
            case 'payment' : {
                this.purchaseTab = false;
                this.contactTab = false;
                this.financeTab = false;
                this.paymentTab = true;
                this.vendorItemsTab = false;
                this.totalResult = 0;
                break;
            }
        }
    }

    getItemNames() {
        this.appService.getItemNames().subscribe(
            data => this.getItemNamesSuccess(data),
            error => this.getItemNamesFail(error),
        );
    }

    getItemNamesSuccess(res) {
        this.itemNamesData = [];
        res.data[0].forEach((item: any) => {
            this.itemNamesData.push(item);
        });
    }

    getItemNamesFail(err) {
        if (err.error && err.error.message) {
            this.toastr.error(err.error.message);
        } else if (typeof(err.error) !== 'undefined') {
            this.toastr.error('Server error');
        }
    }

    loadStates() {
        this.userUtility.states.forEach((item: any) => {
            this.statesData.push({state: item})
        });
    }

    addVendorItems() {
        const vendorItemData = {
            'id': this.id,
            'item_id': this.itemSelected,
            'price': this.itemPrice,
        };
        this.appService.addNewVendorItems(vendorItemData).subscribe(
            data => this.addNewVendorItemSuccess(data),
            error => this.addNewVendorFail(error),
        );
    }


    getVendorTagsById(data) {
        this._spinner.show();
        const vendorData = {id: data};
        this.appService.getCandidateTagById(vendorData).subscribe(
            data => this.setTags(data),
            error => this.setDataFail(error)
        );
    }

    getVendorItemsById(data) {
        this._spinner.show();
        const vendorData = {id: data};
        this.appService.getVendorItemsById(vendorData).subscribe(
            data => this.getVendorItemsByIdSuccess(data),
            error => this.setDataFail(error)
        );
    }

    getSummation(data, numberData) {
        let total=0;
        data.forEach(val => {
            const quant: any = (val.quantity) ? Number(val.quantity) : 0;
            const updated: any = (val.updated_price) ? Number(val.updated_price) : 0;
            const price: any = (val.price) ? Number(val.price) : 0;
            if (val.updated_price) {
                total = total + quant * updated;
            } else {
                total = total + quant * price;
            }
        });
        return total;
    }

    setTags(res) {
        this._spinner.hide();
        this.tagData = [];
        this.tagData = res.data[0];
        res.data[0].forEach((item: any) => {
            this.assignTagsArray.push(item.tag_name);
        });
        // if (this.vendor.contact_number) {
        this.form.controls['tags'].setValue(this.assignTagsArray);
        // }

    }

    getVendorItemsByIdSuccess(res) {
        this._spinner.hide();
        this.source.reset();
        this.source.load(res.data[0]);
        this.vendorItemData = [];
        this.vendorItemDataPurchse = [];
        this.vendorItemData = Array.from(res.data[0]);
        this.vendorItemDataPurchse = res.data[0];
        console.log(this.vendorItemDataPurchse,'----------------');
    }

    checkValue(data){
        console.log(data);
    }

    getVendorById(data) {
        this._spinner.show();
        const vendorData = {id: data};
        this.appService.viewVendorbyId(vendorData).subscribe(
            data => this.setDataSuccess(data),
            error => this.setDataFail(error)
        );
    }

    getVendorTags() {
        this._spinner.show();
        this.appService.getAllTags().subscribe(
            data => this.getDataSuccess(data),
            error => this.getDataFail(error)
        );
    }

    removeCandidatetags(event) {
        // toastr.error('Tag is Removed Successfully');
        this.tagData.forEach((item: any) => {
            if (item.tag_name == event) {
                this.deletetaglist.push(item.tag_id);
            }
        });
    }

    getDataSuccess(res) {
        res.data[0].forEach((item: any) => {
            this.tagsArray.push(item.name);
        });
    }

    getDataFail(error) {
        this._spinner.hide();
        if (error.error && error.error.message) {
            this.toastr.error(error.error.message);
        } else {
            this.toastr.error('Server error');
        }
    }

    setValuesForInfoTable(data) {
        const contactName: any = (data.name) ? data.name : 'NA';
        const companyName: any = (data.company_name) ? data.company_name : 'NA';
        const email: any = (data.email) ? data.email : 'NA';

        const bankName: any = (data.bank_name) ? data.bank_name : 'NA';
        const accountNumber: any = (data.account_number) ? data.account_number : 'NA';
        let accountType: any;
        const IFSC: any = (data.ifsc_code) ? data.ifsc_code : 'NA';
        const GST: any = (data.gst_number) ? data.gst_number : 'NA';
        const PAN: any = (data.pan_number) ? data.pan_number : 'NA';

        // Contact Information

        this.vendorData.push({
            'name': 'Contact Person',
            'description': contactName,
        });
        this.vendorData.push({
            'name': 'Company Name',
            'description': companyName,
        });
        this.vendorData.push({
            'name': 'Email',
            'description': data.email,
        });
        this.vendorData.push({
            'name': 'Contact Number',
            'description': data.contact_number,
        });
        this.vendorData.push({
            'name': 'City',
            'description': data.city + ', ' + data.pin_code,
        });

        // Financial Information

        this.financialData.push({
            'name': 'Bank Name',
            'description': bankName,
        });
        this.financialData.push({
            'name': 'Account Number',
            'description': accountNumber,
        });

        if ( data.bank_type == 1) {
            accountType = 'Current';
        } else if (data.bank_type == 2) {
            accountType = 'Saving';
        } else {
            accountType = 'NA';
        }

        this.financialData.push({
            'name': 'Account Type',
            'description': accountType,
        });
        this.financialData.push({
            'name': 'IFSC Code',
            'description': IFSC,
        });
        this.financialData.push({
            'name': 'GST Number',
            'description': GST,
        });
        this.financialData.push({
            'name': 'PAN Number',
            'description': PAN,
        });
        console.log(this.financialData);
    }


    setDataSuccess(res) {
        this.vendor = res.data[0][0];
        this.setValuesForInfoTable(this.vendor);

        // this.infoSource.reset();
        // this.infoSource.load(this.vendorData[0]);

        this.id_user = this.vendor.id;
        if (this.vendor.name) {
            this.form.controls['vendorName'].setValue(this.vendor.name);
        }
        if (this.vendor.company_name) {
            this.form.controls['companyName'].setValue(this.vendor.company_name);
        }
        if (this.vendor.email) {
            this.form.controls['email'].setValue(this.vendor.email);
        }
        if (this.vendor.gst_number) {
            this.form.controls['gst_number'].setValue(this.vendor.gst_number);
        }
        if (this.vendor.address_line_one) {
            this.form.controls['AddressOne'].setValue(this.vendor.address_line_one);
        }
        if (this.vendor.address_line_two) {
            this.form.controls['AddressTwo'].setValue(this.vendor.address_line_two);
        }
        if (this.vendor.contact_number) {
            this.form.controls['phoneNumber'].setValue(this.vendor.contact_number);
        }
        if (this.vendor.city) {
            this.form.controls['city'].setValue(this.vendor.city);
        }
        if (this.vendor.state) {
            this.form.controls['state'].setValue(this.vendor.state);
        }
        if (this.vendor.bank_type) {
            this.form.controls['bank_type'].setValue(this.vendor.bank_type);
        }
        if (this.vendor.bank_name) {
            this.form.controls['bankName'].setValue(this.vendor.bank_name);
        }
        if (this.vendor.ifsc_code) {
            this.form.controls['ifsc_code'].setValue(this.vendor.ifsc_code);
        }
        if (this.vendor.account_number) {
            this.form.controls['bankDetails'].setValue(this.vendor.account_number);
        }
        if (this.vendor.pin_code) {
            this.form.controls['pin_code'].setValue(this.vendor.pin_code);
        }
        if (this.vendor.pan_number) {
            this.form.controls['pan_number'].setValue(this.vendor.pan_number);
        }
        this._spinner.hide();
    }

    setDataFail(error) {
    }


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
            'state': this.fb.control(''),
            'pin_code': this.fb.control('', Validators.compose([Validators.pattern('^[1-9][0-9]{5}$')])),
            'tags': this.fb.control([], Validators.compose([Validators.required])),
            'bankName': this.fb.control(''),
            'bankDetails': this.fb.control('', Validators.compose([Validators.pattern('^(0|[0-9]{9,18})$')])),
            'bank_type': this.fb.control(''),
            'pan_number': this.fb.control('', Validators.compose([Validators.pattern('[A-Za-z]{5}\\d{4}[A-Za-z]{1}')])),
            'ifsc_code': this.fb.control('', Validators.compose([Validators.pattern('^[A-Za-z]{4}0[a-zA-Z0-9]{6}$')])),
            'gst_number': this.fb.control
            ('', Validators.compose([Validators.pattern('^[0-9]{2}[A-Za-z]{5}[0-9]{4}[A-Z]{1}[1-9A-Za-z]{1}Z[0-9A-Za-z]{1}$')])),
        });
    }

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
            'state': value.state.trim(),
            'pin_code': value.pin_code,
            'tags': value.tags,
            'delete_tag': this.deletetaglist,
            'id': this.id,

            'bank_name': value.bankName.trim(),
            'bank_type': value.bank_type,
            'bank_details': value.bankDetails.trim(),
            'pan_number': value.pan_number.trim(),
            'gst_number': value.gst_number.trim(),
            'ifsc_code': value.ifsc_code,


        };
        // Api call to edit profile, if success editUserProfile(data) and if error editUserProfileFail(error)
        this.appService.editVendorById(userData).subscribe(
            data => this.addNewVendorSuccess(data),
            error => this.addNewVendorFail(error),
        );
    }

    //if edit profile success
    addNewVendorSuccess(result) {
        this.deletetaglist = [];
        this._spinner.hide();
        this.toastr.success(this.userUtility.successMessages['EDIT_VENDOR_SUCCESS']);
        // console.log("result", result);
        this.router.navigate(['/viewVendors']);
    }

    addNewVendorItemSuccess(result) {
        if (result.status < 0) {
            this.toastr.error("Vendor's Item is Already Exist");
        } else {
            this._spinner.hide();
            // console.log();
            this.toastr.success("Vendor's Item" + result.data.message);
            this.getVendorItemsById(this.id);
        }
    }

    goBack() {
        this.router.navigate(['/viewVendors']);
    }

    checkZeros(data) {
        if (data == 0) {
            return true;
        } else {
            return false;
        }
    }

    addCandidatetags(event) {
    }

    //if edit profile fail
    addNewVendorFail(error) {
        this._spinner.hide();
        if (error.error && error.error.message) {
            this.toastr.error(error.error.message);
        } else {
            this.toastr.error('Server error');
        }
    }

}
