import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { P2pService } from '@core/services/p2p/p2p.service';
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
    visible = false;
    text = '';
    ref: DynamicDialogRef | undefined;
    constructor(
        private route: ActivatedRoute,
        private P2pService: P2pService,
        public dialogService: DialogService
    ) {}

    showDialog() {
        // this.P2pService.start();
        this.ref = this.dialogService.open(SessionSetupComponent, {
            header: 'Select a Product',
            modal: true,
            draggable: true,
            resizable: true
        });
        this.visible = true;
    }

    change() {
        console.log('change');
    }
    ngOnInit() {
        // todo-bt sanitize?
        const sessionId = this.route.snapshot.paramMap.get('session_id');
        if (sessionId) {
            this.P2pService.getRoomOccupants(sessionId).then(occupants => {
                if (occupants.length === 0) {
                    console.log('free room');
                    this.text = 'Free Room';
                    // this.showDialog();
                } else {
                    this.text = 'Room taken';
                    // this.showDialog();
                }
            });
        } else {
            console.error('falsy session id');
        }
    }

    ngOnDestroy(): void {
        console.log('SessionViewComponent destroy');
    }
}
