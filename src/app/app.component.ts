import { Component } from '@angular/core';
import { ThemeService } from '@core/services/theme.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'webrtc-p2p';
    minutes = 0;
    gender = 'female';
    fly = true;
    logo = 'https://angular.io/assets/images/logos/angular/angular.png';
    inc(i: number) {
        this.minutes = Math.min(5, Math.max(0, this.minutes + i));
    }
    male() {
        this.gender = 'male';
    }
    female() {
        this.gender = 'female';
    }
    other() {
        this.gender = 'other';
    }

    constructor(private themeService: ThemeService) {}

    changeTheme(theme: string) {
        this.themeService.switchTheme(theme);
    }
}
