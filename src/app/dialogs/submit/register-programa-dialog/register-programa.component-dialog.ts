// Modules
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-register-programa-dialog',
  standalone: true,
  imports: [DialogModule, InputTextModule, ButtonModule],
  templateUrl: './register-programa.component-dialog.html',
  styleUrl: './register-programa.component-dialog.scss'
})

export class RegisterProgramaComponentDialog {

  @Input() isRegisterOpen: boolean = true;
  @Output() toggleOpenRegister = new EventEmitter();

  closeRegisterDialog () {
    this.toggleOpenRegister.emit();
  }

}
