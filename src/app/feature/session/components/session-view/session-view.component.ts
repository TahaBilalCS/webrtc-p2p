import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { P2pService, SessionConfig } from '@core/services/p2p/p2p.service';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DialogService, DynamicDialogRef, DynamicDialogModule } from 'primeng/dynamicdialog';
import { SessionSetupComponent } from '@shared/components/session-setup/session-setup.component';

@Component({
    selector: 'app-session-view',
    standalone: true,
    imports: [CommonModule, ButtonModule, DialogModule, DynamicDialogModule],
    providers: [DialogService],
    templateUrl: './session-view.component.html',
    styleUrls: ['./session-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SessionViewComponent implements OnInit, OnDestroy {
    text = '123';
    ref: DynamicDialogRef | undefined;

    roomPassword: string | null = null;
    roomNameFromURL: string | null = null;
    isPromptRequired = false;
    initialRouterState: { [p: string]: any } | undefined;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private P2pService: P2pService,
        public dialogService: DialogService
    ) {
        // This needs to be done in the constructor in order to get the navigation state
        this.initialRouterState = this.router.getCurrentNavigation()?.extras.state;
    }

    showDialog() {
        // this.P2pService.start();
        this.ref = this.dialogService.open(SessionSetupComponent, {
            header: 'Select a Product',
            modal: true,
            draggable: true,
            resizable: true
        });
    }

    change() {
        console.log('change');
    }
    ngOnInit() {
        // todo-bt sanitize?
        console.log('SessionViewComponent init');
        this.roomNameFromURL = this.route.snapshot.paramMap.get('session_id');

        const routerState = this.initialRouterState;
        if (routerState && routerState['roomPassword'] && this.roomNameFromURL) {
            this.roomPassword = routerState['roomPassword'];
        } else {
            this.isPromptRequired = true;
            console.log('prompt required');
        }

        if (!this.isPromptRequired && this.roomNameFromURL && routerState && routerState['roomPassword']) {
            const roomName = this.roomNameFromURL;

            this.P2pService.getRoomOccupants(this.roomNameFromURL).then(occupants => {
                console.log('occupants', occupants);
                if (occupants.length === 0) {
                    console.log('free room');
                    this.text = 'Free Room';
                    this.P2pService.start({
                        roomName,
                        roomPassword: routerState['roomPassword']
                    });
                } else {
                    this.text = 'Room taken';
                    console.log('room taken');
                    this.P2pService.start({
                        roomName,
                        roomPassword: routerState['roomPassword']
                    });
                    // this.showDialog();
                }
            });
        } else {
            console.log('prompt required, or room name null');
        }
    }

    ngOnDestroy(): void {
        console.log('SessionViewComponent destroy');
    }
}
