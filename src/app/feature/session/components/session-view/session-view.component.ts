import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-session-view',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './session-view.component.html',
    styleUrls: ['./session-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SessionViewComponent implements OnInit, OnDestroy {
    constructor(public router: Router) {}
    ngOnInit() {
        console.log('SessionViewComponent init');
    }

    ngOnDestroy(): void {
        console.log('SessionViewComponent destroy');
    }
}
