import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {forgotPassword} from './forgotPassword.component';

describe('forgotPassword', () => {
    let component: forgotPassword;
    let fixture: ComponentFixture<forgotPassword>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [forgotPassword]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(forgotPassword);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
