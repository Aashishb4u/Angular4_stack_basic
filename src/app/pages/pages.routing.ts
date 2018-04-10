import {Routes, RouterModule}  from '@angular/router';
import {Pages} from './pages.component';
import {ModuleWithProviders} from '@angular/core';
import {LoginGuard} from "../filter/app.guard";
import {AdminGuard} from "../filter/app.adminGuard";

export const routes:Routes = [
    {
        path: 'login',
        loadChildren: 'app/pages/login/login.module#LoginModule',
    },
    {
        path: '',
        loadChildren: 'app/pages/login/login.module#LoginModule'
    },
    {
        path: 'forgot-password',
        loadChildren: 'app/pages/forgotPassword/forgotPassword.module#ForgotPasswordModule'
    },
    {
        path: 'signup',
        loadChildren: 'app/pages/signUp/signUp.module#SignUpModule'
    },
    {
        path: 'reset-password',
        loadChildren: 'app/pages/resetPassword/resetPassword.module#ResetPasswordModule'
    },
    {
        path: 'set-password',
        loadChildren: 'app/pages/setPassword/setPassword.module#SetPasswordModule'
    },
    {
        path: '',
        component: Pages,
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                loadChildren: './dashboard/dashboard.module#DashboardModule',
                canActivate: [LoginGuard]
            },
            {
                path: 'addVendor',
                loadChildren: './addVendor/addVendor.module#addVendorModule',
                canActivate: [LoginGuard]
            },
            {
                path: 'editVendor',
                loadChildren: './editVendor/editVendor.module#editVendorModule',
                canActivate: [LoginGuard]
            },
            {
                path: 'viewVendors',
                loadChildren: './vendor/vendor.module#VendorModule',
                canActivate: [LoginGuard]
            },
        ],
    },
];

export const routing:ModuleWithProviders = RouterModule.forChild(routes);
