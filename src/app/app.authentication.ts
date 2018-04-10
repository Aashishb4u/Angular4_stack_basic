import {Injectable, EventEmitter, Output} from '@angular/core';
@Injectable()

export class AuthenticationHelper {
    user: any;
    private userKey: string = 'user';
    tokenKey: string = 'auth_token';
    user_role: string = 'user_role_id';
    superAdminId: any = '1';
    adminId: any = '2';


    @Output() changeContentTopText: EventEmitter<any> = new EventEmitter(true);
    @Output() userValueChanged: EventEmitter<any> = new EventEmitter(true);

    constructor() {
    }

    setToken(token) {
        console.log('1');
        localStorage.setItem('token', token);
    }

    setApiKey(api_key) {
        console.log('2');
        localStorage.setItem('api-key', api_key);
    }

    setUserLocal(value){
        let rolesArray = value.success.data.user.roles.map((item) => {
            return item.role.name;
        });
        if (value.success.data.user) {
            if (rolesArray.indexOf('admin') !== -1) {
                localStorage.setItem('userName', 'ADMIN');
                localStorage.setItem('user', JSON.stringify(value.success.data.user));
                localStorage.setItem('roles', rolesArray)
                localStorage.setItem('profileImageURL', value.success.data.user.profileImageURL);
            } else {
                localStorage.setItem('user', JSON.stringify(value.success.data.user));
                localStorage.setItem('userName', value.success.data.user.firstName);
                localStorage.setItem('roles', rolesArray);
                localStorage.setItem('email', value.success.data.user.email);
                localStorage.setItem('profileImageURL', value.success.data.user.profileImageURL);
            }
        }

    }

    getToken() {
        return localStorage.getItem('auth_token');
    }

    removeLoggedIn() {
        localStorage.removeItem(this.tokenKey);
        localStorage.removeItem(this.user_role);
    }

    /**
     * isLoggedIn()
     * tokens comes from backend is stored in local storage
     * 'auth_token' : <token>
     * @returns {boolean}
     */
    isLoggedIn() {
        const token: any = localStorage.getItem(this.tokenKey);
        if (token && token.length > 0) {
            return true;
        }
        return false;
    }


    /**
     * setLoggedIn()
     * when response comes from login API then token, user_role_id, user_name is stored
     * at local storage.
     * @param res
     */
    setLoggedIn(res) {
        const token: any = res.data.auth_token;
        if (token) {
            localStorage.setItem(this.tokenKey, token);
            localStorage.setItem(this.user_role, res.data.user_role_id);
            if (res.data.user_role_id == 1) {
                localStorage.setItem('userName', 'Super Admin');
            }
        }
    }

    /**
     * if user_role is 1 then returns true
     * @returns {boolean}
     */

    isSuperAdmin() {
        if (localStorage.getItem(this.user_role) == this.superAdminId) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * if user_role is 2 then returns true
     * @returns {boolean}
     */

    isAdmin() {
        if (localStorage.getItem(this.user_role) == this.adminId) {
            return true;
        } else {
            return false;
        }
    }

    getUserData() {
        return localStorage.getItem(this.userKey);
    }

    setIsLoggedIn(IsLoggedIn) {
        localStorage.setItem('IsLoggedIn', IsLoggedIn);
    }

    setChangedContentTopText(value) {
        this.changeContentTopText.emit(value);
    }

    getChangedContentTopText(): EventEmitter<any> {
        return this.changeContentTopText;
    }

    userValueChangedEvent(value): void {
        this.user = value;
        this.userValueChanged.emit(value);
    }

    getUserValueChangeEmitter(): EventEmitter<any> {
        return this.userValueChanged;
    }

    setUser(inputUser) {
        this.user = inputUser;
    }

    getUser() {
        return this.user;
    }
}
