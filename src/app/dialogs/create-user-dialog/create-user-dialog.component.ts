// Modules
import { Component } from '@angular/core';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-create-user-dialog',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './create-user-dialog.component.html',
  styleUrl: './create-user-dialog.component.scss'
})
export class CreateUserDialogComponent {

  isAddUserDialogVisible = true

}
