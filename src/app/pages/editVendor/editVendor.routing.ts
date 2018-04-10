import {Routes, RouterModule}  from '@angular/router';
import {editVendor} from './editVendor.component';
import {ModuleWithProviders} from '@angular/core';
export const routes: Routes = [
    {
        path: '',
        component: editVendor,
        children: []
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
