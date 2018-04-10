import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {addUser} from './addUser.component';

describe('addUser', () => {
    let component: addUser;
    let fixture: ComponentFixture<addUser>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [addUser]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(addUser);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
