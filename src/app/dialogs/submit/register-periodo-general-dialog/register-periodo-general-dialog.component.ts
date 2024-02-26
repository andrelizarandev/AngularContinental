// Modules
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

// Data
import { ratingOptions } from '../../../data/data.options';

@Component({
  selector: 'app-register-periodo-general-dialog',
  standalone: true,
  imports: [
    DialogModule, 
    InputTextModule, 
    DropdownModule,
    ButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './register-periodo-general-dialog.component.html',
  styleUrl: './register-periodo-general-dialog.component.scss'
})

export class RegisterPeriodoGeneralDialogComponent {

  // Inputs
  @Input() isDialogOpen = false;
  @Input() currentModalidad:string | null = null;
  @Input() currentModalidadName:string | null = null;

  // Outputs
  @Output() closeDialogEmitter = new EventEmitter(); 

  constructor (private fb:FormBuilder) {}

  formatoForm = this.fb.group ({

    horas_asincronas: ['', Validators.required],
    horas_sincronas: ['', Validators.required],
    intro_evaluacion_entrada: [null, Validators.required],
    intro_hoja_calendario: [null, Validators.required],

    u1_autoevaluacion: [null, Validators.required],
    u1_ppt: [null, Validators.required],
    u1_guia: [null, Validators.required],
    u1_pa2: [null, Validators.required],

    u2_autoevaluacion: [null, Validators.required],
    u2_ppt: [null, Validators.required],
    u2_guia: [null, Validators.required],
    u2_pa2: [null, Validators.required],

    u3_autoevaluacion: [null, Validators.required],
    u3_ppt: [null, Validators.required],
    u3_guia: [null, Validators.required],
    u3_pa2: [null, Validators.required],

  });

  closeRegister () {
    this.closeDialogEmitter.emit();
  }

  public get ratingOptions() {
    return ratingOptions;
  }
  
}
