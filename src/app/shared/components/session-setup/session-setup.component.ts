import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoFocusModule } from 'primeng/autofocus';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DayNightToggleComponent } from '@shared/components/day-night-toggle/day-night-toggle.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'primeng/api';
import { FocusTrapModule } from 'primeng/focustrap';
import { Router } from '@angular/router';
import { noop } from 'rxjs';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-session-setup',
    standalone: true,
    imports: [
        CommonModule,
        AutoFocusModule,
        ButtonModule,
        CardModule,
        DayNightToggleComponent,
        ReactiveFormsModule,
        SharedModule,
        FocusTrapModule
    ],
    providers: [DynamicDialogRef],
    templateUrl: './session-setup.component.html',
    styleUrls: ['./session-setup.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SessionSetupComponent {
    sessionSetupForm: FormGroup;
    loading = false;

    constructor(
        private fb: FormBuilder,
        private router: Router
    ) {
        this.sessionSetupForm = this.fb.group({
            // themeChecked: true
        });
    }

    startNewSession() {
        this.loading = true;
        this.router.navigate(['/session', 1]).then(noop);
    }
}
