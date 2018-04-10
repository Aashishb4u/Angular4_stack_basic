import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {setPassword} from './setPassword.component';

describe('resetPassword', () => {
    let component: setPassword;
    let fixture: ComponentFixture<setPassword>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [setPassword]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(setPassword);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});