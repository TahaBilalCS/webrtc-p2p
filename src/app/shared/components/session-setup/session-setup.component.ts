import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoFocusModule } from 'primeng/autofocus';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DayNightToggleComponent } from '@shared/components/day-night-toggle/day-night-toggle.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'primeng/api';
import { FocusTrapModule } from 'primeng/focustrap';
import { Router } from '@angular/router';
import { noop, Subject, takeUntil } from 'rxjs';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

export
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
        FocusTrapModule,
        InputTextModule,
        PasswordModule
    ],
    providers: [DynamicDialogRef],
    templateUrl: './session-setup.component.html',
    styleUrls: ['./session-setup.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
class SessionSetupComponent {
    sessionSetupForm: FormGroup;
    loading = false;
    private destroy$ = new Subject<void>();

    constructor(
        private fb: FormBuilder,
        private router: Router
    ) {
        this.sessionSetupForm = this.fb.group({
            roomName: null,
            roomPassword: null
        });
    }

    startNewSession() {
        const roomName = this.sessionSetupForm.get('roomName')?.value;
        const roomPassword = this.sessionSetupForm.get('roomPassword')?.value;
        this.router.navigate(['/session', roomName], { state: { roomPassword } });

        // this.loading = true;
    }
}
