import { ChangeDetectionStrategy, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoFocusModule } from 'primeng/autofocus';
import { InputTextModule } from 'primeng/inputtext';
import { AppTheme, ThemeService } from '@core/services/theme/theme.service';
import { first, map, of, Subject, takeUntil } from 'rxjs';

/**
 *
 */
@Component({
    selector: 'app-day-night-toggle',
    standalone: true,
    imports: [CommonModule, AutoFocusModule, InputTextModule],
    templateUrl: './day-night-toggle.component.html',
    styleUrls: ['./day-night-toggle.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DayNightToggleComponent implements OnInit, OnDestroy {
    @ViewChild('toggleCheckbox', { static: true }) toggleCheckbox!: ElementRef;

    @Input() hideTitle = false;
    private destroy$ = new Subject<void>();

    isChecked$ = of(false);

    constructor(private themeService: ThemeService) {}

    ngOnInit() {
        this.isChecked$ = this.themeService.currentTheme.pipe(
            takeUntil(this.destroy$),
            map(theme => theme === AppTheme.LIGHT)
        );

        // Set the initial state of the checkbox. Using first() will auto complete the subscription
        this.isChecked$.pipe(first()).subscribe(isChecked => {
            this.toggleCheckbox.nativeElement.checked = isChecked;
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    toggle($e?: Event): void {
        $e?.stopPropagation();
        this.themeService.toggleTheme();
    }
}
