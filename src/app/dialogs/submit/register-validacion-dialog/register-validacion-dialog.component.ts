// Modules
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-register-validacion-dialog',
  standalone: true,
  imports: [
    DialogModule, 
    ButtonModule, 
    InputTextModule,
    ReactiveFormsModule
  ],
  templateUrl: './register-validacion-dialog.component.html',
  styleUrl: './register-validacion-dialog.component.scss'
})

export class RegisterValidacionDialogComponent {

  @Input() isDialogOpen = false;
  @Output() closeDialogEmitter = new EventEmitter();

  closeDialog () {
    this.closeDialogEmitter.emit();
  }

}
