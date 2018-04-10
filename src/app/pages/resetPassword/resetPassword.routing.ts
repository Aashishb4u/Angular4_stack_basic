import {Routes, RouterModule}  from '@angular/router';
import {resetPassword} from './resetPassword.component';
import {ModuleWithProviders} from '@angular/core';
export const routes: Routes = [
    {
        path: '',
        component: resetPassword
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);



