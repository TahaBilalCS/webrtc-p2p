import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoFocusModule } from 'primeng/autofocus';
import { ButtonModule } from 'primeng/button';
import { noop } from 'rxjs';
import { ThemeService } from '@core/services/theme.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home-view',
    standalone: true,
    imports: [CommonModule, AutoFocusModule, ButtonModule],
    templateUrl: './home-view.component.html',
    styleUrls: ['./home-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeViewComponent implements OnInit, OnDestroy {
    title = 'webrtc-p2p';
    loading = false;

    constructor(
        private themeService: ThemeService,
        private router: Router
    ) {}

    ngOnInit() {
        console.log('home component init');
    }

    ngOnDestroy(): void {
        console.log('home component destroy');
    }

    changeTheme(theme: string) {
        this.themeService.switchTheme(theme);
    }

    startNewSession() {
        this.loading = true;
        this.router.navigate(['/session', 1]).then(noop);
    }
}
