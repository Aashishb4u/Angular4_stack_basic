import {Component, ViewContainerRef} from '@angular/core';
import * as $ from 'jquery';
import {GlobalState} from './global.state';
import { ToastsManager, ToastOptions } from 'ng2-toastr/ng2-toastr';
import {BaThemePreloader, BaThemeSpinner} from './theme/services';

@Component({
    selector: 'app',
    styleUrls: ['./app.component.scss'],
    template: `
    <main [ngClass]="{'menu-collapsed': isMenuCollapsed}">
      <div class="additional-bg"></div>
      <router-outlet></router-outlet>
    </main>
  `
})
export class App {

    isMenuCollapsed: boolean = false;

    constructor(private _state: GlobalState,
                private _spinner: BaThemeSpinner,
                private viewContainerRef: ViewContainerRef,
                public toastr: ToastsManager, vRef: ViewContainerRef ) {
        this.toastr.setRootViewContainerRef(vRef);


        this._loadImages();

        this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
            this.isMenuCollapsed = isCollapsed;
        });
    }

    ngAfterViewInit(): void {
        // hide spinner once all loaders are completed
        BaThemePreloader.load().then((values) => {
            this._spinner.hide();
        });
    }

    private _loadImages(): void {
        // register some loaders
    }

}
