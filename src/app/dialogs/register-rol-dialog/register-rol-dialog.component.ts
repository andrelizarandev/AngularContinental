// Modules
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-register-rol-dialog',
  standalone: true,
  imports: [DialogModule, ButtonModule, InputTextModule],
  templateUrl: './register-rol-dialog.component.html',
  styleUrl: './register-rol-dialog.component.scss'
})

export class RegisterRolDialogComponent {

  @Input() isRegisterOpen = false;
  @Output() toggleOpenRegister = new EventEmitter();

  closeRegisterDialog () {
    this.toggleOpenRegister.emit();
  }

}
