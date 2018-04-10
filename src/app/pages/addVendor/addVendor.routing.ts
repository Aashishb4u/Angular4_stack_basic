import {Routes, RouterModule}  from '@angular/router';
import {addVendor} from './addVendor.component';
import {ModuleWithProviders} from '@angular/core';
export const routes: Routes = [
    {
        path: '',
        component: addVendor,
        children: []
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
