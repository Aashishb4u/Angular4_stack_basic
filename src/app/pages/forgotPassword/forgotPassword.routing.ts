import {Routes, RouterModule}  from '@angular/router';
import {forgotPassword} from './forgotPassword.component';
const routes: Routes = [
    {
        path: '',
        component: forgotPassword
    }
];

export const routing = RouterModule.forChild(routes);
