import {NgModule}      from '@angular/core';
import {CommonModule}  from '@angular/common';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {NgaModule} from '../../theme/nga.module';
import {editVendor} from './editVendor.component';
import {routing} from './editVendor.routing';
import {RlTagInputModule} from 'angular2-tag-input';
import { TextMaskModule } from 'angular2-text-mask';
import {ModalModule} from 'ng2-modal';
import {DataTableModule} from 'angular2-datatable';

import {Ng2SmartTableModule} from "ng2-smart-table";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgaModule,
        ModalModule,
        routing,
        DataTableModule,
        RlTagInputModule,
        ReactiveFormsModule,
        TextMaskModule,
        Ng2SmartTableModule
    ],
    declarations: [
        editVendor
    ],
    providers: []
})
export class editVendorModule {
}
