// Modules
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// Components
import { CardWithSkeletonComponent } from '../../../components/card-with-skeleton/card-with-skeleton.component';
import { NavigationContainerComponent } from '../../../components/navigation-container/navigation-container.component';
import { RegisterPeriodoGeneralDialogComponent } from '../../../dialogs/submit/register-periodo-general-dialog/register-periodo-general-dialog.component';

// Dialogs
import { OptionData } from '../submit-solicitud-diseno-screen/submit-solicitud-diseno-curso.component';

// Service
import { ProduccionService } from '../../../api/produccion/produccion.service';
import { SolicitudDisenoCursoService } from '../../../api/solicitudes-diseno-curso/diseno-curso.service';

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
    RegisterPeriodoGeneralDialogComponent,
    CardWithSkeletonComponent,
    CommonModule
  ],
  templateUrl: './submit-produccion-general.component.html',
  styleUrl: './submit-produccion-general.component.scss'
})

export class SubmitProduccionGeneralComponent {

  isRegisterOpen = false;
  registerProduccionGeneralForm: FormGroup;

  // Dynamic options
  eapListOptions:OptionData[] = [];
  planListOptions:OptionData[] = [];
  tipoAsignaturaListOptions:OptionData[] = [];

  // Static options
  simuladorListOptions:OptionData[] = [
    { id:'1', label:'U1' },
    { id:'2', label:'U2' },
    { id:'3', label:'U3' },
    { id:'4', label:'U4' },
    { id:'5', label:'U 1, 2, 3, 4' },
    { id:'6', label:'No' },
  ];

  colaborativoListOptions:OptionData[] = [
    { id:'1', label:'C1' },
    { id:'2', label:'C2' },
    { id:'3', label:'C1 y C2' },
    { id:'4', label:'C1 - EP y 2' },
    { id:'5', label:'No' },
    { id:'6', label:'Ep' },
  ];

  realidadAumentadaListOptions:OptionData[] = [
    { id:'1', label:'U1' },
    { id:'2', label:'U2' },
    { id:'3', label:'U3' },
    { id:'4', label:'U4' },
    { id:'5', label:'U 1, 2, 3, 4' },
    { id:'6', label:'No' },
  ];

  constructor (
    private fb:FormBuilder, 
    private activeRoute:ActivatedRoute,
    private router:Router
  ) {

    this.registerProduccionGeneralForm = this.fb.group({

      codigo:['', Validators.required],
      plan:[null, Validators.required],
      eap:[null, Validators.required],
      asignatura:['', Validators.required],
      tipo_asignatura:[null, Validators.required],
      numero_formatos:['', Validators.required],
      situacion_asignatura:[null, Validators.required],

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

  // Queries
  disenoCursoByIdService = inject(ProduccionService)

    .getProduccionGeneralById(this.activeRoute.snapshot.params['id'])

    .result$

    .subscribe((result) => {

      if (result.isSuccess) {

        const data = result.data.data;

        if (data != null) {

          const { tipo_asignatura, plan, codigo, eap } = data;

          this.registerProduccionGeneralForm.patchValue({

            ...this.registerProduccionGeneralForm.value,

            codigo,

            plan,

            tipo_asignatura,

            eap

          })

        }

      }

    });

  getPlanListService = inject(SolicitudDisenoCursoService)
    .getPlanList()
    .result$
    .subscribe((result) => {
      if (result.isSuccess) {
        this.planListOptions = result.data.map((row) => ({ id:row.id.toString(), label:row.nombre }));
      } 
    });

  getEapListService = inject(SolicitudDisenoCursoService)
    .getEapList()
    .result$
    .subscribe((result) => {
      if (result.isSuccess) {
        this.eapListOptions = result.data.map((row) => ({ id:row.id.toString(), label:row.nombre }));
      } 
    });

  getTipoAsignaturaListService = inject(SolicitudDisenoCursoService)
    .getTipoAsignaturaList()
    .result$
    .subscribe((result) => {
      if (result.isSuccess) {
        this.tipoAsignaturaListOptions = result.data.map((row) => ({ id:row.toString(), label:row.nombre }));
      } 
    });

  // Toggle
  toggleIsRegisterOpen () {
    this.isRegisterOpen = !this.isRegisterOpen;
  }

  // Return
  redirectToProduccionGeneral () {
    this.router.navigate(['/produccion-general']);
  }

}
