// Modules
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-register-periodo-dialog',
  standalone: true,
  imports: [DialogModule, ButtonModule, InputTextModule],
  templateUrl: './register-periodo-dialog.component.html',
  styleUrl: './register-periodo-dialog.component.scss'
})

export class RegisterPeriodoDialogComponent {

  @Input() isRegisterOpen = false;
  @Output() toggleOpenRegister = new EventEmitter();
  
  closeRegister () {
    this.toggleOpenRegister.emit();
  }

}
