import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionSetupComponent } from './session-setup.component';

describe('SessionSetupComponent', () => {
    let component: SessionSetupComponent;
    let fixture: ComponentFixture<SessionSetupComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [SessionSetupComponent]
        });
        fixture = TestBed.createComponent(SessionSetupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
