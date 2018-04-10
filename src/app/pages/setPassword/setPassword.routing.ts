import {Routes, RouterModule}  from '@angular/router';
import {setPassword} from './setPassword.component';
import {ModuleWithProviders} from '@angular/core';
export const routes: Routes = [
    {
        path: '',
        component: setPassword
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);



