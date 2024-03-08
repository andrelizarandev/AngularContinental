// Modules
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// Types
import { OptionData, OptionDataIdNumber } from '../../../screens/submit/submit-solicitud-diseno-screen/submit-solicitud-diseno-curso.component';

@Component({
  selector: 'app-register-validacion-dialog',
  standalone: true,
  imports: [
    DialogModule, 
    ButtonModule, 
    InputTextModule,
    ReactiveFormsModule,
    DropdownModule
  ],
  templateUrl: './register-validacion-dialog.component.html',
  styleUrl: './register-validacion-dialog.component.scss'
})

export class RegisterValidacionDialogComponent {

  // Props
  @Input() isDialogOpen = false;
  @Output() closeDialogEmitter = new EventEmitter();

  // Forms
  submitValidacionForm:FormGroup = this.fb.group ({
    fecha_envio_validacion:['', Validators.required],
    porcentaje_real:['', Validators.required],
    carpeta_entregable:['', Validators.required],
    fecha_validacion:['', Validators.required],
    estado_avance_validacion:[null as (OptionData | null), Validators.required],
    confirmacion_levantamiento_observaciones:[null as (OptionData | null), Validators.required],
    presenta_guia_aprendizaje:[null as (OptionData | null), Validators.required],
    resultados_aprendizaje_guia_estudiante:[null as (OptionData | null), Validators.required],
    enlaces_e_hipervinculos_para_recursos:[null as (OptionData | null), Validators.required],
    actividades_propuestas:[null as (OptionData | null), Validators.required],
    foro_formativo:[null as (OptionData | null), Validators.required],
    objetos_aprendizaje:[null as (OptionData | null), Validators.required],
    observaciones_validador:['', Validators.required],
    pasa_implementacion:[null as (OptionData | null), Validators.required],
    observacion_scorm:[null as (OptionData | null), Validators.required],
  });

  constructor (private fb:FormBuilder) {}


  estadoAvanceValidacionOptions:OptionDataIdNumber[] = [
    { id:1, label:'25%-1U,' },
    { id:2, label:'50%-2U,' },
    { id:3, label:'75%-3U,' },
    { id:4, label:'100%-4U,' },
  ]

  siNoObservacionOptions:OptionDataIdNumber[] = [
    { id:1, label:'Si' },
    { id:2, label:'No' },
    { id:3, label:'Observación' },
  ]

  closeDialog () {
    this.closeDialogEmitter.emit();
  }

}