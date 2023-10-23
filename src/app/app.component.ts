import { Component } from '@angular/core';
import { ThemeService } from '@core/services/theme.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'webrtc-p2p';

    constructor(private themeService: ThemeService) {}

    changeTheme(theme: string) {
        this.themeService.switchTheme(theme);
    }
}
