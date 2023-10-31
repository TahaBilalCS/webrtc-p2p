import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from '@core/services/theme/theme.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet],
    providers: [],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
    constructor(private themeService: ThemeService) {}

    ngOnInit() {
        this.themeService.initializeTheme();
    }

    ngOnDestroy() {
        console.log('app component destroy');
    }
}
