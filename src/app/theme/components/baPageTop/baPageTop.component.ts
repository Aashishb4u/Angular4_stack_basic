import {Component, ViewContainerRef} from '@angular/core';
import {GlobalState} from '../../../global.state';
import {Router, ActivatedRoute, NavigationExtras} from '@angular/router';
import {AuthenticationHelper} from '../../../app.authentication';
import {Location} from '@angular/common';
import {ApplicationAdminServices} from "../../../appServices/application";
import {BaThemeSpinner} from "../../services/baThemeSpinner/baThemeSpinner.service";
import {ToastsManager} from "ng2-toastr";
declare const FB: any;
@Component({
    selector: 'ba-page-top',
    templateUrl: './baPageTop.html',
    styleUrls: ['./baPageTop.scss'],
})

export class BaPageTop {
    public isScrolled: boolean = false;
    public isMenuCollapsed: boolean = false;
    public userName: string;
    public userProfileImage: string;
    public rolesArray: any = [];
    public isAdmin: boolean;
    

    constructor(private adminServices: ApplicationAdminServices, public toastr: ToastsManager, private spinner: BaThemeSpinner, private _state: GlobalState, public router: Router,
                public authentication: AuthenticationHelper, private location: Location, vRef: ViewContainerRef) {
        this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
            this.isMenuCollapsed = isCollapsed;
        });
        FB.init({
            appId: '206515609891723',
            cookie: true,  // enable cookies to allow the server to access
            xfbml: true,  // parse social plugins on this page
            version: 'v2.8', // use graph api version 2.5
        });
        this.userName = localStorage.getItem('userName');
        this.userProfileImage = localStorage.getItem('profileImageURL');
        this.rolesArray = localStorage.getItem('roles');
        // if (this.rolesArray.indexOf('admin') !== -1){
        //     this.isAdmin = false;
        // }else{
            this.isAdmin = true;
        // }
    }

    ngOnInit() {
        this.authentication.getUserValueChangeEmitter().subscribe(item => this.setUserInfo());
    }

    public toggleMenu() {
        this.isMenuCollapsed = !this.isMenuCollapsed;
        this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
        return false;
    }

    public scrolledChanged(isScrolled) {
        this.isScrolled = isScrolled;
    }

    // logout
    // public loggedOff() {
    //     FB.getLoginStatus((response) => {
    //         if (response && response.status === 'connected') {
    //             FB.logout();
    //         }
    //     }, true);
    //     this.router.navigate(['login']);
    //     localStorage.clear();
    //     this.toastr.success('Logged Out successfully');
    // }

    loggedOff() {
        FB.getLoginStatus((response) => {
            if (response && response.status === 'connected') {
                FB.logout();
            }
        }, true);
        this.authentication.removeLoggedIn();
        const data = this.authentication.getToken();
        this.adminServices.userLogout(data).subscribe(
            data => this.logOutSuccess(data),
            error => this.logOutFail(error)
        );
    }

    logOutSuccess(result) {
        const data = {};
        this.authentication.setUser(data);
        this.toastr.success('Logged Out successfully');
        this.router.navigate(['login']);

    }

    logOutFail(error) {
        this.toastr.success('Logged Out Failed');
        // toastr.error(error.error_message);
    }

    // navigate to profile.
    public navigateToProfile() {
        this.router.navigate(['profile']);
    }

    // navigate to dashboard.
    navigateToDashboard() {
        this.router.navigate(['user']);
    }

    userValueChanged(value) {
        this.setUserInfo();
    }

    // to set updated user details
    public setUserInfo() {
        let input = this.authentication.getUser();
        this.userProfileImage = input.profileImageURL;
        this.userName = input.firstName;
    }
}
