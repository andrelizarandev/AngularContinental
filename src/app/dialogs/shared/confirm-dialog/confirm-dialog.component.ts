// Modules
import { Store, select } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Component, inject } from '@angular/core';

// Selector
import { confirmDialogPayloadSelector } from '../../../state/selectors/ui.selector';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [DialogModule, ButtonModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss'
})

export class ConfirmDialogComponent {

  confirmDeletePayload:ConfirmDialogPayload | null = null;

  store = inject(Store);

  constructor () {
    this.store.pipe(select(confirmDialogPayloadSelector)).subscribe((confirmDialogPayload) => {
      console.log('confirmDeletePayload', confirmDialogPayload);
      this.confirmDeletePayload = confirmDialogPayload;
    });
  }

}

export type ConfirmDialogPayload = {
  title: string
  message: string
  actionLabel: string
  action: () => void
  cancelAction: () => void
}
