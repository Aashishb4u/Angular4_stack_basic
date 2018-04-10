import {Routes, RouterModule}  from '@angular/router';
import {VendorComponent} from './vendor.component';
import {ModuleWithProviders} from '@angular/core';
export const routes: Routes = [
    {
        path: '',
        component: VendorComponent,
        children: []
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
