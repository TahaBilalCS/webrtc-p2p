import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionViewComponent } from './session-view.component';

describe('SessionViewComponent', () => {
    let component: SessionViewComponent;
    let fixture: ComponentFixture<SessionViewComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [SessionViewComponent]
        });
        fixture = TestBed.createComponent(SessionViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
