// Modules
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// Components
import { NavigationContainerComponent } from '../../components/navigation-container/navigation-container.component';

// Dialogs
import { RegisterPeriodoGeneralDialogComponent } from '../../dialogs/register-periodo-general-dialog/register-periodo-general-dialog.component';

@Component({
  selector: 'app-submit-produccion-general',
  standalone: true,
  imports: [ 
    NavigationContainerComponent, 
    ButtonModule, 
    DropdownModule, 
    InputTextModule, 
    DividerModule,
    ReactiveFormsModule,
    RegisterPeriodoGeneralDialogComponent
  ],
  templateUrl: './submit-produccion-general.component.html',
  styleUrl: './submit-produccion-general.component.scss'
})
export class SubmitProduccionGeneralComponent {

  registerProduccionGeneralForm: FormGroup;
  isRegisterOpen = true;

  constructor (private fb:FormBuilder) {
    this.registerProduccionGeneralForm = this.fb.group({

      codigo:['', Validators.required],
      plan:['', Validators.required],
      eap:['', Validators.required],
      tipo_asignatura:['', Validators.required],
      numero_formatos:['', Validators.required],
      situacion_asignatura:['', Validators.required],

      fecha_inicio:['', Validators.required],
      fecha_finalizacion:['', Validators.required],
      tiempo_programado:['', Validators.required],

      asesor_didactico:['', Validators.required],
      correo_asesor_didactico:['', Validators.required],
      telefono_asesor_didactico:['', Validators.required],

      decano_director_camara:['', Validators.required],
      correo_decano_director_camara:['', Validators.required],

      docente_disenador:['', Validators.required],
      email_docente_disenador:['', Validators.required],
      procedencia_docente_disenador:['', Validators.required],
      observaciones_designacion_docente:['', Validators.required],
      telefono_docente_disenador:['', Validators.required],
      designacion_docente:['', Validators.required],

      disenador_instruccional:['', Validators.required],
      correo_disenador_instruccional:['', Validators.required],
      telefono_disenador_instruccional:['', Validators.required],

      responsable_seguimiento:['', Validators.required],
      carpeta_entregable:['', Validators.required],
      video_presentacion:['', Validators.required],

      producto_academico:['', Validators.required],
      simulador:['', Validators.required],
      unidad_1:['', Validators.required],
      unidad_2:['', Validators.required],
      unidad_3:['', Validators.required],
      unidad_4:['', Validators.required],

      fecha_presentacion_di:['', Validators.required],
      fecha_presentacion:['', Validators.required],
      observaciones:['', Validators.required],
      correo_finalizacion:['', Validators.required],

    });
  }

  public toggleIsRegisterOpen () {
    this.isRegisterOpen = !this.isRegisterOpen;
  }

}
