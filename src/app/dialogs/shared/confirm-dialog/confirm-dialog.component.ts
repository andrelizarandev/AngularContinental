// Modules
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [DialogModule, ButtonModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss'
})

export class ConfirmDialogComponent {

  @Input() confirmDeletePayload:ConfirmDialogPayload | null = null

}

export type ConfirmDialogPayload = {
  title: string
  message: string
  actionLabel: string
  action: () => void
  cancelAction: () => void
}
