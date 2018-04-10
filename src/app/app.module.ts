import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import {routing} from './app.routing';
import { ChartsModule } from 'ng2-charts';

// App is our top level component
import {App} from './app.component';
import {AppState, InternalStateType} from './app.service';
import {GlobalState} from './global.state';
import {NgaModule} from './theme/nga.module';
import {PagesModule} from './pages/pages.module';
import {AuthenticationHelper} from './app.authentication';
import {HttpClientHelper} from './app.httpClient';
import {ApplicationAdminServices} from './appServices/application';
import {LoginGuard} from './filter/app.guard';
import {AdminGuard} from './filter/app.adminGuard';
// import {UtilityHelper} from "./pages/shared/utility";
import {DatePipe} from "@angular/common";

// Application wide providers
const APP_PROVIDERS = [
    AppState,
    GlobalState,
    AdminGuard,
    LoginGuard
];

export type StoreType = {
    state: InternalStateType,
    restoreInputValues: () => void,
    disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
    bootstrap: [App],
    declarations: [App], // include capitalize pipe here
    imports: [ // import Angular's modules
        BrowserModule,
        HttpModule,
        RouterModule,
        FormsModule,
        ChartsModule,
        ReactiveFormsModule,
        NgaModule.forRoot(),
        NgbModule.forRoot(),
        PagesModule,
        routing,
        ToastModule.forRoot(),
        BrowserAnimationsModule
    ],
    providers: [ // expose our Services and Providers into Angular's dependency injection
        APP_PROVIDERS,
        AuthenticationHelper,
        HttpClientHelper,
        ApplicationAdminServices,
        // UtilityHelper,
        DatePipe,
    ],
})

export class AppModule {

    constructor(public appState: AppState) {
    }
}
