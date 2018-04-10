import {NgModule}      from '@angular/core';
import {CommonModule}  from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {setPassword} from './setPassword.component';
import {routing}       from './setPassword.routing';
@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        routing
    ],
    declarations: [
        setPassword
    ]
})
export class SetPasswordModule {
}
