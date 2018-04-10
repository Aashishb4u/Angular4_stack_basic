import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClientHelper } from '../app.httpClient';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import 'rxjs/Rx';
import { Router } from '@angular/router';

@Injectable()
export class ApplicationAdminServices {
    private loginWithfacebookUrl: string = 'users/loginwithfacebook';

    /**
     * Newly written APIs
     * @type {string}
     */

    private loginUrl: string = '/login';
    private logoutUrl: string = '/logout';
    private addVendorUrl: string = '/addVendor';
    private addVendorItemsUrl: string = '/addVendorItems';
    private addItemUrl: string = '/addItem';
    private editVendorUrl: string = '/editVendor';
    private editItemUrl: string = '/editItem';
    private deleteVendorUrl: string = '/deleteVendor';
    private deleteItemUrl: string = '/deleteItem';
    private deleteVendorItemUrl: string = '/deleteVendorItem';
    private deleteTagsUrl: string = '/deleteVendorTags';
    private addTagUrl: string = '/addVendorTags';
    private viewVendorbyIdUrl: string = '/getVendorbyId';
    private viewItembyIdUrl: string = '/getItembyId';
    private getVendorTagsByIdUrl: string = '/viewVendorTags';
    private getVendorItemsByIdUrl: string = '/getVendorItems';
    private getAllVendorsForItemByIdUrl: string = '/getAllVendorsForItem';
    private getItemTagsByIdUrl: string = '/viewItemTags';
    private getAllTagsUrl: string = '/viewAllTags';

    /**
     * Old APIs
     * @type {string}
     */

    private signUpUrl: string = 'users/signup';
    private editUserProfileUrl: string = 'users/edit';
    private createInvestorProfileUrl: string = 'investors/createInvestor';
    private generateCodeUrl: string = 'users/generateCode';
    private forgotPasswordUrl: string = 'users/forgotPassword';
    private setPasswordUrl: string = 'users/setPassword';
    private getAllUsersUrl: string = 'users/fetchUsers';
    private getAllInvestorsUrl: string = 'investors/fetchInvestors';
    private getUserProfileUrl: string = 'users/profile';
    private getVendorsUrl: string = '/getVendors';
    private getItemsUrl: string = '/viewItems';
    private viewVendorNamesUrl: string = '/viewVendorNames';
    private getItemNamesUrl: string = '/viewItemNames';
    private emailVerificationUrl: string = 'users/emailVerification';
    private updateActiveStatusUrl: string = 'users/toActiveInActiveUser';
    private changePasswordUrl: string = 'users/changePassword';
    private getUsersExportDataUrl: string = 'users/exportUsers';
    private getInvestorsExportDataUrl: string = 'investors/exportInvestors';
    private addNewUserUrl: string = 'users/addUser';
    private createOfferingUrl: string = 'deals/addDeal';
    private editOfferingUrl: string = 'deals/edit';
    private getAllOfferingsUrl: string = 'deals/fetchDeals';
    private getSpecificOfferingUrl: string = 'deals/deal/';
    private httpClient: HttpClientHelper;

    constructor(httpClient: HttpClientHelper, private router: Router, public toastr: ToastsManager) {
        this.httpClient = httpClient;
    }

    // Login With Facebook
    loginWithFacebook(data) {
        return this.httpClient.post(this.loginWithfacebookUrl, data)
            .map(this.extractResponse)
            .catch(this.handleError.bind(this));
    }


    // New APIs -

    /**
     * To get call user login
     * @param data
     * @returns {Observable<any>}
     */
    userLogin(data): Observable<any> {
        return this.httpClient.post(this.loginUrl, data)
            .map(this.extractResponse)
            .catch(this.handleError.bind(this));
    }

    /**
     * To post call for user logout
     * @param data
     * @returns {Observable<any>}
     */

    userLogout(data): Observable<any> {
        return this.httpClient.post(this.logoutUrl, data)
            .map(this.extractResponse)
            .catch(this.handleError);
    }

    /**
     * To get call for view Vendor details by Id.
     * @param data
     * @returns {Observable<any>}
     */

    viewVendorbyId(data): Observable<any> {
        return this.httpClient.post(this.viewVendorbyIdUrl, data)
            .map(this.extractResponse)
            .catch(this.handleError.bind(this));
    }

    /**
     * To get call for view Vendor details by Id.
     * @param data
     * @returns {Observable<any>}
     */

    viewItembyId(data): Observable<any> {
        return this.httpClient.post(this.viewItembyIdUrl, data)
            .map(this.extractResponse)
            .catch(this.handleError.bind(this));
    }

    getCandidateTagById(data): Observable<any> {
        return this.httpClient.post(this.getVendorTagsByIdUrl, data)
            .map(this.extractResponse)
            .catch(this.handleError.bind(this));
    }

    getVendorItemsById(data): Observable<any> {
        return this.httpClient.post(this.getVendorItemsByIdUrl, data)
            .map(this.extractResponse)
            .catch(this.handleError.bind(this));
    }

    getAllVendorsForItemById(data): Observable<any> {
        return this.httpClient.post(this.getAllVendorsForItemByIdUrl, data)
            .map(this.extractResponse)
            .catch(this.handleError.bind(this));
    }

    /**
     * To get call for get Item Tags details by Id.
     * @param data
     * @returns {Observable<any>}
     */

    getItemTagById(data): Observable<any> {
        return this.httpClient.post(this.getItemTagsByIdUrl, data)
            .map(this.extractResponse)
            .catch(this.handleError.bind(this));
    }

    /**
     * To post call for edit Vendor details by Id.
     * @param data
     * @returns {Observable<any>}
     */

    editVendorById(data): Observable<any> {
        return this.httpClient.post(this.editVendorUrl, data)
            .map(this.extractResponse)
            .catch(this.handleError.bind(this));
    }

    /**
     * To post call for edit Vendor details by Id.
     * @param data
     * @returns {Observable<any>}
     */

    editItemById(data): Observable<any> {
        return this.httpClient.post(this.editItemUrl, data)
            .map(this.extractResponse)
            .catch(this.handleError.bind(this));
    }

    /**
     * To post call for add new Vendor details.
     * @param data
     * @returns {Observable<any>}
     */

    addNewVendor(data): Observable<any> {
        return this.httpClient.post(this.addVendorUrl, data)
            .map(this.extractResponse)
            .catch(this.handleError.bind(this));
    }


    addNewVendorItems(data): Observable<any> {
        return this.httpClient.post(this.addVendorItemsUrl, data)
            .map(this.extractResponse)
            .catch(this.handleError.bind(this));
    }

    /**
     * To post call for add new Item details.
     * @param data
     * @returns {Observable<any>}
     */

    addNewItem(data): Observable<any> {
        return this.httpClient.post(this.addItemUrl, data)
            .map(this.extractResponse)
            .catch(this.handleError.bind(this));
    }

    /**
     * To post call for delete Vendor details by Id.
     * @param data
     * @returns {Observable<any>}
     */

    deleteVendor(data): Observable<any> {
        return this.httpClient.post(this.deleteVendorUrl, data)
            .map(this.extractResponse)
            .catch(this.handleError.bind(this));
    }

    /**
     * To post call for delete Vendor details by Id.
     * @param data
     * @returns {Observable<any>}
     */

    deleteItem(data): Observable<any> {
        return this.httpClient.post(this.deleteItemUrl, data)
            .map(this.extractResponse)
            .catch(this.handleError.bind(this));
    }

    deleteVendorItem(data): Observable<any> {
        return this.httpClient.post(this.deleteVendorItemUrl, data)
            .map(this.extractResponse)
            .catch(this.handleError.bind(this));
    }

    /**
     * To post call for delete Tags by Id.
     * @param data
     * @returns {Observable<any>}
     */
    deleteTags(data): Observable<any> {
        return this.httpClient.post(this.deleteTagsUrl, data)
            .map(this.extractResponse)
            .catch(this.handleError.bind(this));
    }

    /**
     *
     * @param data
     * @returns {Observable<any>}
     */

    addTag(data): Observable<any> {
        return this.httpClient.post(this.addTagUrl, data)
            .map(this.extractResponse)
            .catch(this.handleError.bind(this));
    }

    /** To post call for show Tags by Id.
     * show all predefined tags
     * @returns {Observable<any>}
     */

    getAllTags(): Observable<any> {
        return this.httpClient.get(this.getAllTagsUrl)
            .map(this.extractResponse)
            .catch(this.handleError.bind(this));
    }

    /**
     * To get call for show Vendors by Id.
     * @returns {Observable<any>}
     */

    getVendors(): Observable<any> {
        return this.httpClient.get(this.getVendorsUrl)
            .map(this.extractResponse)
            .catch(this.handleError.bind(this));
    }

    /**
     * To get call for show Vendors by Id.
     * @returns {Observable<any>}
     * */

    getItems(): Observable<any> {
        return this.httpClient.get(this.getItemsUrl)
            .map(this.extractResponse)
            .catch(this.handleError.bind(this));
    }

    getVendorNames(): Observable<any> {
        return this.httpClient.get(this.viewVendorNamesUrl)
            .map(this.extractResponse)
            .catch(this.handleError.bind(this));
    }

    /**
     * To get call for show all items.
     * @returns {Observable<any>}
     * */

    getItemNames(): Observable<any> {
        return this.httpClient.get(this.getItemNamesUrl)
            .map(this.extractResponse)
            .catch(this.handleError.bind(this));
    }




    // Old APIs -

    //To get call user signUp
    userSignUp(data): Observable<any> {
        return this.httpClient.post(this.signUpUrl, data)
            .map(this.extractResponse)
            .catch(this.handleError.bind(this));
    }

    //To get call user signUp
    addNewUser(data): Observable<any> {
        return this.httpClient.post(this.addNewUserUrl, data)
            .map(this.extractResponse)
            .catch(this.handleError.bind(this));
    }

    //To get call edit user profile
    editUserProfile(data): Observable<any> {
        return this.httpClient.put(this.editUserProfileUrl, data)
            .map(this.extractResponse)
            .catch(this.handleError.bind(this));
    }

    //To post call create investor profile
    createInvestorProfile(data): Observable<any> {
        return this.httpClient.post(this.createInvestorProfileUrl, data)
            .map(this.extractResponse)
            .catch(this.handleError.bind(this));
    }

    //To get call user generateCode
    generateCode(data): Observable<any> {
        return this.httpClient.post(this.generateCodeUrl, data)
            .map(this.extractResponse)
            .catch(this.handleError.bind(this));
    }


    // To get Users Export Data
    getUsersExportData(searchValue): Observable<any> {
        return this.httpClient.get(this.getUsersExportDataUrl + searchValue)
            .map(this.extractResponse)
            .catch(this.handleError.bind(this));
    }

    // To get Investors Export Data
    getInvestorsExportData(searchValue): Observable<any> {
        return this.httpClient.get(this.getInvestorsExportDataUrl + searchValue)
            .map(this.extractResponse)
            .catch(this.handleError.bind(this));
    }

    //To get call user forgotPassword
    forgotPassword(data): Observable<any> {
        return this.httpClient.post(this.forgotPasswordUrl, data)
            .map(this.extractResponse)
            .catch(this.handleError.bind(this));
    }

    //To get call user setPassword
    setPassword(data): Observable<any> {
        return this.httpClient.post(this.setPasswordUrl, data)
            .map(this.extractResponse)
            .catch(this.handleError.bind(this));
    }

    //To call get all user
    getUsers(searchValue): Observable<any> {
        return this.httpClient.get(this.getAllUsersUrl + searchValue)
            .map(this.extractResponse)
            .catch(this.handleError.bind(this));
    }


    //To call get all investors
    getInvestors(searchValue): Observable<any> {
        return this.httpClient.get(this.getAllInvestorsUrl + searchValue)
            .map(this.extractResponse)
            .catch(this.handleError.bind(this));
    }

    //To call get user profile details
    getUserProfile(): Observable<any> {
        return this.httpClient.get(this.getUserProfileUrl)
            .map(this.extractResponse)
            .catch(this.handleError.bind(this));
    }

    // To call get vendors details

    //To get call user forgotPassword
    emailVerification(data): Observable<any> {
        return this.httpClient.put(this.emailVerificationUrl, data)
            .map(this.extractResponse)
            .catch(this.handleError.bind(this));
    }

    //To get call
    editUserActiveStatus(data): Observable<any> {
        return this.httpClient.put(this.updateActiveStatusUrl, data)
            .map(this.extractResponse)
            .catch(this.handleError.bind(this));
    }

    //To call change password
    changePassword(data): Observable<any> {
        return this.httpClient.post(this.changePasswordUrl, data)
            .map(this.extractResponse)
            .catch(this.handleError.bind(this));
    }

    // To call create offerings API.
    createOffering(data): Observable<any> {
        return this.httpClient.post(this.createOfferingUrl, data)
            .map(this.extractResponse)
            .catch(this.handleError.bind(this));
    }

    // To call edit offerings API.
    editOffering(data): Observable<any> {
        return this.httpClient.put(this.editOfferingUrl, data)
            .map(this.extractResponse)
            .catch(this.handleError.bind(this));
    }

    // To call get all offerings
    getOfferings(searchValue): Observable<any> {
        return this.httpClient.get(this.getAllOfferingsUrl + searchValue)
            .map(this.extractResponse)
            .catch(this.handleError.bind(this));
    }

    // To call get specific offering details
    getSpecificOffering(offeringId): Observable<any> {
        return this.httpClient.get(this.getSpecificOfferingUrl + offeringId)
            .map(this.extractResponse)
            .catch(this.handleError.bind(this));
    }

    private extractResponse(res) {
        return res;
    }

    private handleError(error) {
        let errorCode = error.error.code;
        // if invalid token or token expired
        if (errorCode == '-114' || errorCode == -114 || errorCode == '-102' || errorCode == -102 || errorCode == '-132'
            || errorCode == -132) {
            // if the user is inactivated by the admin
            if (errorCode == '-132' || errorCode == -132) {
                localStorage.clear();
                this.toastr.error(error.error.message);
                setTimeout(() => {
                    this.router.navigate(['login']);
                }, 3000);
            } else {
                localStorage.clear();
                this.router.navigate(['login']);
            }
        } else {
            return Observable.throw(error);
        }
    }
}
