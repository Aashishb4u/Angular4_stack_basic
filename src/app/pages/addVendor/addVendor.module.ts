import {NgModule}      from '@angular/core';
import {CommonModule}  from '@angular/common';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {NgaModule} from '../../theme/nga.module';
import {addVendor} from './addVendor.component';
import {routing}       from './addVendor.routing';
import { TextMaskModule } from 'angular2-text-mask';
import {RlTagInputModule} from 'angular2-tag-input';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgaModule,
        routing,
        ReactiveFormsModule,
        TextMaskModule,
        RlTagInputModule
    ],
    declarations: [
        addVendor
    ],
    providers: []
})
export class addVendorModule {
}
