// Modules
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { Component, inject } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ActivatedRoute, Router } from '@angular/router';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// Components
import { CardWithSkeletonComponent } from '../../../components/card-with-skeleton/card-with-skeleton.component';
import { NavigationContainerComponent } from '../../../components/navigation-container/navigation-container.component';
import { RegisterPeriodoGeneralDialogComponent } from '../../../dialogs/submit/register-periodo-general-dialog/register-periodo-general-dialog.component';

// Dialogs
import { UploadSilaboDialogComponent } from '../../../dialogs/submit/upload-silabo-dialog/upload-silabo.component';

// Service
import { ProduccionService } from '../../../api/produccion/produccion.service';
import { SolicitudDisenoCursoService } from '../../../api/solicitudes-diseno-curso/diseno-curso.service';

// Types
import { OptionData } from '../submit-solicitud-diseno-screen/submit-solicitud-diseno-curso.component';

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
    UploadSilaboDialogComponent,
    CommonModule
  ],
  templateUrl: './submit-produccion-general.component.html',
  styleUrl: './submit-produccion-general.component.scss'
})

export class SubmitProduccionGeneralComponent {

  // Is open
  isUploadSilaboDialogOpen = false;
  isRegisterPeriodoGeneralDialogOpen = false;

  // Forms
  registerProduccionGeneralForm: FormGroup;

  // Services
  produccionGeneralService = inject(ProduccionService);
  solicitudDisenoCursoService = inject(SolicitudDisenoCursoService);

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

  constructor (private fb:FormBuilder, private activeRoute:ActivatedRoute, private router:Router) {

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

      asesor:['', Validators.required],
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
      fecha_finalizacion_presentacion:['', Validators.required],
      observaciones:['', Validators.required],
      correo_finalizacion:['', Validators.required],

    });

  }
  
  // Queries
  getProduccionGeneralById = injectQuery(() => ({

    queryKey: ['get-produccion-general', this.activeRoute.snapshot.params['id']],

    queryFn: async () => {

      try {

        const result = await this.produccionGeneralService.getProduccionGeneralById(this.activeRoute.snapshot.params['id'])

        const { 
          codigo, 
          plan, 
          eap, 
          tipo_asignatura, 
          numero_formatos, 
          situacion_asignatura,
          fecha_inicio,
          tiempo_programado,
          fecha_programada,
          asesor,
          telefono_asesor,
          correo_asesor,
          decano,
          correo_decano,
          docente_disenador,
          email_docente,
          observaciones,
          telefono_docente,
          designacion,
          carpeta_entregable,
          responsable,
          video_presentacion,
          colaborativo,
          simulador,
          unidad1,
          unidad2,
          unidad3,
          unidad4,
          fecha_presentacion_di,
          correo_finalizacion,
          fecha_finalizacion
        } = result.data!!;

        this.registerProduccionGeneralForm.patchValue({ 
          codigo, 
          plan, 
          eap, 
          tipo_asignatura, 
          numero_formatos, 
          situacion_asignatura,
          fecha_inicio,
          tiempo_programado,
          fecha_finalizacion:fecha_programada,
          asesor,
          telefono_asesor_didactico:telefono_asesor,
          correo_asesor_didactico:correo_asesor,
          decano_director_camara:decano,
          correo_decano_director_camara:correo_decano,
          docente_disenador,
          email_docente_disenador:email_docente,
          procedencia_docente_disenador:'Null',
          observaciones_designacion_docente:observaciones,
          telefono_docente_disenador:telefono_docente,
          designacion_docente:designacion,

          disenador_instruccional:'',
          correo_disenador_instruccional:'',
          telefono_disenador_instruccional:'',

          responsable_seguimiento:responsable,
          video_presentacion,
          carpeta_entregable,

          producto_academico:colaborativo,
          simulador,
          unidad_1:unidad1,
          unidad_2:unidad2,
          unidad_3:unidad3,
          unidad_4:unidad4,

          fecha_presentacion_di,
          fecha_finalizacion_presentacion:fecha_finalizacion,
          observaciones,
          correo_finalizacion,

        });

      } catch (err:any) {

        return Promise.reject(err);

      }

    }

  }));

  getPlanListQuery = injectQuery(() => ({
    queryKey: ['get-plan-list'],
    queryFn: async () => {
      try {
        const result = await this.solicitudDisenoCursoService.getPlanList();
        const options:OptionData[] = result.map((data) => ({ id:data.id.toString(), label:data.nombre }));
        this.planListOptions = options;
      } catch (err:any) {
        return Promise.reject(err);
      }
    }
  }));

  getEapListQuery = injectQuery(() => ({
    queryKey: ['get-eap-list'],
    queryFn: async () => {
      try {
        const result = await this.solicitudDisenoCursoService.getEapList();
        const options:OptionData[] = result.map((data) => ({ id:data.id.toString(), label:data.nombre }));
        this.eapListOptions = options;
      } catch (err:any) {
        return Promise.reject(err);
      }
    }
  }));

  getTipoAsignaturaListQuery = injectQuery(() => ({
    queryKey: ['get-tipo-asignatura-list'],
    queryFn: async () => {
      try {
        const result = await this.solicitudDisenoCursoService.getTipoAsignaturaList();
        const options:OptionData[] = result.map((data) => ({ id:data.id.toString(), label:data.nombre }));
        this.tipoAsignaturaListOptions = options;
      } catch (err:any) {
        return Promise.reject(err);
      }
    }
  }));

  // Toggle
  toggleIsRegisterPeriodoGeneralDialogOpen () {
    this.isRegisterPeriodoGeneralDialogOpen = !this.isRegisterPeriodoGeneralDialogOpen;
  }
  
  toggleIsUploadSilaboDialogOpen () {
    this.isUploadSilaboDialogOpen = !this.isUploadSilaboDialogOpen;
  }
  
  // Return
  redirectToProduccionGeneral () {
    this.router.navigate(['/produccion-general']);
  }

}
