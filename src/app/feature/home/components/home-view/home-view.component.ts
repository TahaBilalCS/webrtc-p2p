import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoFocusModule } from 'primeng/autofocus';
import { ButtonModule } from 'primeng/button';
import { noop } from 'rxjs';
import { AppTheme, ThemeService } from '@core/services/theme.service';
import { Router } from '@angular/router';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-home-view',
    standalone: true,
    imports: [CommonModule, AutoFocusModule, ButtonModule, InputSwitchModule, ReactiveFormsModule],
    templateUrl: './home-view.component.html',
    styleUrls: ['./home-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeViewComponent implements OnInit, OnDestroy {
    protected readonly AppTheme = AppTheme;

    title = 'webrtc-p2p';
    homeFormGroup!: FormGroup;

    theme: string | null = null;
    loading = false;

    constructor(
        private themeService: ThemeService,
        private router: Router,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        this.homeFormGroup = this.fb.group({
            themeChecked: true
        });
        this.themeService.currentTheme.subscribe(theme => {
            if (theme === AppTheme.LIGHT) {
                this.homeFormGroup.patchValue({ themeChecked: false });
            } else {
                this.homeFormGroup.patchValue({ themeChecked: true });
            }
        });

        console.log('home component init');
    }

    ngOnDestroy(): void {
        console.log('home component destroy');
    }

    toggleTheme() {
        this.themeService.toggleTheme();
    }

    startNewSession() {
        this.loading = true;
        this.router.navigate(['/session', 1]).then(noop);
    }
}
