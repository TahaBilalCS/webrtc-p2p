import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionSetupComponent } from '@shared/components/session-setup/session-setup.component';

@Component({
    selector: 'app-home-view',
    standalone: true,
    imports: [CommonModule, SessionSetupComponent],
    templateUrl: './home-view.component.html',
    styleUrls: ['./home-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeViewComponent implements OnInit, OnDestroy {
    constructor() {}

    ngOnInit() {}

    ngOnDestroy(): void {}
}
