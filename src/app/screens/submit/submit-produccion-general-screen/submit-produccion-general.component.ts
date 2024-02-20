// Modules
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { MessageModule } from 'primeng/message';
import { Component, inject } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ActivatedRoute, Router } from '@angular/router';
import { injectMutation, injectQuery } from '@tanstack/angular-query-experimental';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// Actions
import { setMessageFromUiDataAction } from '../../../state/actions/ui-actions';

// Classes
import BreadcrumbItemsClass from '../../../utils/breadcrumb-items';

// Components
import { CustomBreadcrumbComponent } from '../../../components/custom-breadcrumb/custom-breadcrumb.component';
import { CardWithSkeletonComponent } from '../../../components/card-with-skeleton/card-with-skeleton.component';
import { NavigationContainerComponent } from '../../../components/navigation-container/navigation-container.component';
import { RegisterPeriodoGeneralDialogComponent } from '../../../dialogs/submit/register-periodo-general-dialog/register-periodo-general-dialog.component';

// Dialogs
import { UploadSilaboDialogComponent } from '../../../dialogs/submit/upload-silabo-dialog/upload-silabo.component';

// Helpers
import HandleDates from '../../../helpers/handle-dates';

// Service
import { ProduccionService } from '../../../api/produccion/produccion.service';
import { SolicitudDisenoCursoService } from '../../../api/solicitudes-diseno-curso/diseno-curso.service';

// Types
import { OptionData } from '../submit-solicitud-diseno-screen/submit-solicitud-diseno-curso.component';
import { GetDataSilabosData, PutProduccionGeneralData } from '../../../api/produccion/produccion.types';

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
    MessageModule,
    CommonModule,
    CustomBreadcrumbComponent
  ],
  templateUrl: './submit-produccion-general.component.html',
  styleUrl: './submit-produccion-general.component.scss'
})

export class SubmitProduccionGeneralComponent {

  currentId = this.activeRoute.snapshot.params['id'];

  // Vars
  isUploadSilaboDialogOpen = false;
  isRegisterPeriodoGeneralDialogOpen = false;
  lastSilaboData:GetDataSilabosData | null = null;
  silabosInThisPeriodoGeneral:GetDataSilabosData[] = [];

  // Forms
  registerProduccionGeneralForm: FormGroup;

  // Services
  produccionGeneralService = inject(ProduccionService);
  solicitudDisenoCursoService = inject(SolicitudDisenoCursoService);

  // Dynamic options
  eapListOptions:OptionData[] = [];
  planListOptions:OptionData[] = [];
  tipoAsignaturaListOptions:OptionData[] = [];

  breadcrumbItems:MenuItem[] = [
    BreadcrumbItemsClass.homeItem,
    BreadcrumbItemsClass.produccionGeneral,
    { ...BreadcrumbItemsClass.registroProduccionGeneralItem(this.currentId) }
  ]

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
    private router:Router,
    private store:Store
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

      // Extra
      adistancia:['', Validators.required],
      autor:['', Validators.required],
      contiverso:['', Validators.required],
      dias_extra:['', Validators.required],
      id:['', Validators.required],
      modalidad:['', Validators.required],
      presencial:['', Validators.required],
      procedencia:['', Validators.required],
      realidad_aumentada:['', Validators.required],
      semipresencial:['', Validators.required],
      solicitud_id:['', Validators.required],

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
          asignatura,
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

          responsable,
          carpeta_entregable,
          video_presentacion,

          colaborativo,
          simulador,
          unidad1,
          unidad2,
          unidad3,
          unidad4,
          fecha_presentacion_di,
          correo_finalizacion,
          fecha_finalizacion,

          // Extra
          adistancia,
          autor, 
          contiverso,
          dias_extra,
          id,
          modalidad,
          presencial,
          procedencia,
          realidad_aumentada,
          semipresencial,
          solicitud_id

        } = result.data!!;

        this.registerProduccionGeneralForm.patchValue({ 

          codigo, 
          plan, 
          eap, 
          asignatura,
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

          // Extra
          adistancia,
          autor,






        });

        this.store.dispatch(setMessageFromUiDataAction({ message:{ message:'Información de Producción Cargada', type:'success' } }))

        return result;

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
        return options;
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
        return options;
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
        return options;
      } catch (err:any) {
        return Promise.reject(err);
      }
    }
  }));

  getSilabosInThisPeriodoGeneral = injectQuery(() => ({
    queryKey: ['get-silabos-in-this-periodo-general', this.activeRoute.snapshot.params['id']],
    queryFn: async () => {
      try {
        const result = await this.produccionGeneralService.getSilabosFromProduccionGeneral(this.activeRoute.snapshot.params['id']);
        this.silabosInThisPeriodoGeneral = result.archivos;
        const lastElement = result.archivos[result.archivos.length - 1];
        if (lastElement) this.lastSilaboData = lastElement;
        return result;
      } catch (err:any) {
        return Promise.reject(err);
      }
    }
  }));

  // Submit
  putProduccionGeneral = injectMutation(() => ({
    mutationFn: () => {
      // const payload:PutProduccionGeneralData = {

      //   codigo:this.registerProduccionGeneralForm.value.codigo,
      //   plan:this.registerProduccionGeneralForm.value.plan,
      //   eap:this.registerProduccionGeneralForm.value.eap,
      //   asignatura:this.registerProduccionGeneralForm.value.asignatura,
      //   tipo_asignatura:this.registerProduccionGeneralForm.value.tipo_asignatura,
      //   numero_formatos:this.registerProduccionGeneralForm.value.numero_formatos,
      //   situacion_asignatura:this.registerProduccionGeneralForm.value.situacion_asignatura,

      //   fecha_inicio:this.registerProduccionGeneralForm.value.fecha_inicio,
      //   tiempo_programado:this.registerProduccionGeneralForm.value.tiempo_programado,
      //   fecha_programada:this.registerProduccionGeneralForm.value.fecha_finalizacion,

      //   asesor:this.registerProduccionGeneralForm.value.asesor,
      //   telefono_asesor:this.registerProduccionGeneralForm.value.telefono_asesor_didactico,
      //   correo_asesor:this.registerProduccionGeneralForm.value.correo_asesor_didactico,

      //   decano:this.registerProduccionGeneralForm.value.decano_director_camara,
      //   correo_decano:this.registerProduccionGeneralForm.value.correo_decano_director_camara,

      //   docente_disenador:this.registerProduccionGeneralForm.value.docente_disenador,
      //   email_docente:this.registerProduccionGeneralForm.value.email_docente_disenador,
      //   observaciones:this.registerProduccionGeneralForm.value.observaciones_designacion_docente,
      //   telefono_docente:this.registerProduccionGeneralForm.value.telefono_docente_disenador,
      //   designacion:this.registerProduccionGeneralForm.value.designacion_docente,

      //   responsable:this.registerProduccionGeneralForm.value.responsable_seguimiento,
      //   carpeta_entregable:this.registerProduccionGeneralForm.value.carpeta_entregable,
      //   video_presentacion:this.registerProduccionGeneralForm.value.video_presentacion,

      //   colaborativo:this.registerProduccionGeneralForm.value.producto_academico,
      //   simulador:this.registerProduccionGeneralForm.value.simulador,
      //   unidad1:this.registerProduccionGeneralForm.value.unidad_1,
      //   unidad2:this.registerProduccionGeneralForm.value.unidad_2,
      //   unidad3:this.registerProduccionGeneralForm.value.unidad_3,
      //   unidad4:this.registerProduccionGeneralForm.value.unidad_4,
      //   fecha_presentacion_di:this.registerProduccionGeneralForm.value.fecha_presentacion_di,

      //   // Extra
      //   correo_finalizacion:this.registerProduccionGeneralForm.value.correo_finalizacion,
      //   fecha_finalizacion:this.registerProduccionGeneralForm.value.fecha_finalizacion_presentacion,
      //   observaciones:this.registerProduccionGeneralForm.value.observaciones,
      //   adistancia:this.registerProduccionGeneralForm.value.adistancia,
      //   autor:this.registerProduccionGeneralForm.value.autor,
      //   contiverso:this.registerProduccionGeneralForm.value.contiverso,
      //   dias_extra:this.registerProduccionGeneralForm.value.dias_extra,
      //   id:this.registerProduccionGeneralForm.value.id,
      //   modalidad:this.registerProduccionGeneralForm.value.modalidad,
      //   presencial:this.registerProduccionGeneralForm.value.presencial,
      //   procedencia:this.registerProduccionGeneralForm.value.procedencia,
      //   realidad_aumentada:this.registerProduccionGeneralForm.value.realidad_aumentada,
      //   semipresencial:this.registerProduccionGeneralForm.value.semipresencial,
      //   solicitud_id:this.registerProduccionGeneralForm.value.solicitud_id

      // }
      return this.produccionGeneralService.putProduccionGeneral(this.currentId, this.registerProduccionGeneralForm.value as PutProduccionGeneralData)
    },
    onSuccess: () => {
      this.store.dispatch(setMessageFromUiDataAction({ message:{ message:'Producción Actualizada', type:'success' } }));
    }
  }));

  // Start
  startPutProduccionGeneral () {
    this.store.dispatch(setMessageFromUiDataAction({ message:{ message:'Producción Actualizada', type:'success' } }));
  }

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

  // Format Date
  formatDate (date:string) {
    const slicedDate = date.slice(0, 10);
    const restDate = date.slice(11, 16);
    return HandleDates.parseDateFormat1ToFormat2(slicedDate, 'YYYY-MM-DD', 'DD/MM/YYYY') + ' ' + restDate;
  }

}
