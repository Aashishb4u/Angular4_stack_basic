import {Injectable, Inject} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class Utility {
    states = [];
    successMessages: any;
    errorMessages: any;
    constructor() {
        this.states = [
           'Andra Pradesh',
            'Arunachal Pradesh',
            'Assam',
            'Bihar',
            'Chhattisgarh',
            'Goa',
            'Gujarat',
            'Haryana',
            'Himachal Pradesh',
            'Jammu and Kashmir',
            'Jharkhand',
            'Karnataka',
            'Kerala',
            'Madya Pradesh',
            'Maharashtra',
            'Manipur',
            'Meghalaya',
            'Mizoram',
            'Nagaland',
            'Orissa',
            'Punjab',
            'Rajasthan',
            'Sikkim',
            'Tamil Nadu',
            'Tripura',
            'Uttaranchal',
            'Uttar Pradesh',
            'West Bengal',
            'Andaman and Nicobar Islands',
            'Chandigarh',
            'Dadar and Nagar Haveli',
            'Daman and Diu',
            'Delhi',
            'Lakshadeep',
            'Pondicherry',
        ];

        this.successMessages = {
            'ADD_VENDOR_SUCCESS': 'Vendor Added Successfully',
            'EDIT_VENDOR_SUCCESS': 'Vendor Updated Successfully',
            'DELETE_VENDOR_SUCCESS': 'Vendor Deleted Successfully',
            'ADD_TAG_SUCCESS': 'Category Added Successfully',
            'EDIT_TAG_SUCCESS': 'Category Updated Successfully',
            'DELETE_TAG_SUCCESS': 'Category Deleted Successfully',
            'ADD_ITEM_SUCCESS': 'Item Added Successfully',
            'EDIT_ITEM_SUCCESS': 'Item Updated Successfully',
            'DELETE_ITEM_SUCCESS': 'Item Deleted Successfully',
            'ADD_VENDOR_ITEM_SUCCESS': "Vendor's Item Added Successfully",
            'EDIT_VENDOR_ITEM_SUCCESS': "Vendor's Item Updated Successfully",
            'DELETE_VENDOR_ITEM_SUCCESS': "Vendor's Item Deleted Successfully",
        };

        this.errorMessages = {
            'EXCEPTION': 'Something Went Wrong',
            'ADD_VENDOR_FAIL': 'Vendor Added Failed',
            'EDIT_VENDOR_FAIL': 'Vendor Updated Failed',
            'DELETE_VENDOR_FAIL': 'Vendor Deleted Failed',
            'ADD_TAG_FAIL': 'Category Added Failed',
            'EDIT_TAG_FAIL': 'Category Updated Failed',
            'DELETE_TAG_FAIL': 'Category Deleted Failed',
            'TAG_EXIST': 'Category Already Exist',
            'TAG_INVALID_ENTRY': 'Please Enter Category First',
            'ADD_ITEM_FAIL': 'Item Added Failed',
            'EDIT_ITEM_FAIL': 'Item Updated Failed',
            'DELETE_ITEM_FAIL': 'Item Deleted Failed',
            'ITEM_ALREADY_EXIST': 'Item Already Exist',
            'ADD_VENDOR_ITEM_FAIL': "Vendor's Item Added Failed",
            'EDIT_VENDOR_ITEM_FAIL': "Vendor's Item Updated Failed",
            'DELETE_VENDOR_ITEM_FAIL': "Vendor's Item Deleted Failed",
        };
    }

}