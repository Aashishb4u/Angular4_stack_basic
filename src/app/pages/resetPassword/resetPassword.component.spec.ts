import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {resetPassword} from './resetPassword.component';

describe('resetPassword', () => {
    let component: resetPassword;
    let fixture: ComponentFixture<resetPassword>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [resetPassword]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(resetPassword);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});