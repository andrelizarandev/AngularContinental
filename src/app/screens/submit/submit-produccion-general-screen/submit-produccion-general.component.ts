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

// Messages
import { putProduccionGeneralSuccessMessage } from '../../../data/data.messages';

// Service
import { ProduccionService } from '../../../api/produccion/produccion.service';
import { ModalidadesService } from '../../../api/modalidades/modalidades.service';
import { SolicitudDisenoCursoService } from '../../../api/solicitudes-diseno-curso/diseno-curso.service';

// Types
import { OptionData, OptionDataIdNumber } from '../submit-solicitud-diseno-screen/submit-solicitud-diseno-curso.component';
import { GetDataSilabosData, ModalidadEnum, PutProduccionGeneralData } from '../../../api/produccion/produccion.types';

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
  extraData:any = null;

  // Modalidad
  modalidadName:ModalidadEnum | null = null;
  currentModalidadForModal:ModalidadEnum | null = null;

  // Forms
  registerProduccionGeneralForm: FormGroup;

  // Services
  modalidadesService = inject(ModalidadesService);
  produccionGeneralService = inject(ProduccionService);
  solicitudDisenoCursoService = inject(SolicitudDisenoCursoService);

  // Options
  tipoAsignaturaListOptions:OptionData[] = [];

  breadcrumbItems:MenuItem[] = [
    BreadcrumbItemsClass.homeItem,
    BreadcrumbItemsClass.produccionGeneral,
    { ...BreadcrumbItemsClass.registroProduccionGeneralItem(this.currentId) }
  ];

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
    private store:Store,
  ) {

    this.registerProduccionGeneralForm = this.fb.group({

      // Form 1
      codigo: ['', Validators.required],
      plan: ['', Validators.required],
      eap: [null, Validators.required],
      asignatura: ['', Validators.required],
      tipo_asignatura: ['', Validators.required],
      numero_formatos: ['', Validators.required],
      situacion_asignatura: ['', Validators.required],
      tipo_diseno: [null, Validators.required],
      
      // Form 2
      fecha_inicio: ['', Validators.required],
      tiempo_programado: ['', Validators.required],
      fecha_programada: ['', Validators.required],

      // Form 3
      asesor: ['', Validators.required],
      telefono_asesor: ['', Validators.required],
      correo_asesor: ['', Validators.required],
      
      // Form 4
      decano: ['', Validators.required],
      correo_decano: ['', Validators.required],

      // Form 5
      docente_disenador: ['', Validators.required],
      observacion_designacion: ['', Validators.required],
      email_docente: ['', Validators.required],
      telefono_docente: ['', Validators.required],
      procedencia: ['', Validators.required],
      designacion: ['', Validators.required],

      // Form 6
      disenador_instruccional: ['', Validators.required],
      telefono_instruccional: ['', Validators.required],
      correo_instruccional: ['', Validators.required],

      // Form 7
      responsable: ['', Validators.required],
      video_presentacion: ['', Validators.required],
      carpeta_entregable: ['', Validators.required],

      // Form 8
      colaborativo: ['', Validators.required],
      unidad1: ['', Validators.required],
      unidad2: ['', Validators.required],
      unidad3: ['', Validators.required],
      unidad4: ['', Validators.required],
      simulador: ['', Validators.required],

      // Form 9
      fecha_presentacion_di: ['', Validators.required],
      observaciones: ['', Validators.required],
      fecha_finalizacion: ['', Validators.required],
      correo_finalizacion: ['', Validators.required],
      
    });

  }
  
  // Queries
  getProduccionGeneralByIdQuery = injectQuery(() => ({

    queryKey: ['get-produccion-general', this.activeRoute.snapshot.params['id']],

    queryFn: async () => {

      try {

        const result = await this.produccionGeneralService.getProduccionGeneralById(this.activeRoute.snapshot.params['id'])

        if (!result.datos_produccion_general) return;

        const { 

          // Form 1
          codigo,
          plan,
          eap,
          asignatura,
          tipo_asignatura,
          numero_formatos,
          situacion_asignatura,
          tipo_diseno,

          // Form 2
          fecha_inicio,
          tiempo_programado,
          fecha_programada,

          // Form 3
          asesor,
          telefono_asesor,
          correo_asesor,

          // Form 4
          decano,
          correo_decano,

          // Form 5
          docente_disenador,
          observacion_designacion,
          email_docente,
          telefono_docente,
          procedencia,
          designacion,

          // Form 6
          disenador_instruccional,
          telefono_instruccional,
          correo_instruccional,

          // Form 7
          responsable,
          video_presentacion,
          carpeta_entregable,

          // Form 8
          colaborativo,
          unidad1,
          unidad2,
          unidad3,
          unidad4,
          simulador,

          // Form 9
          fecha_presentacion_di,
          observaciones,
          fecha_finalizacion,
          correo_finalizacion,

          // Extras
          adistancia,
          autor,
          ciclo,
          contiverso,
          dias_extra,
          facultad,
          id,
          modalidad,
          nombre_formato_adistancia,
          nombre_formato_presencial,
          nombre_formato_semipresencial,
          presencial,
          realidad_aumentada,
          semipresencial,
          solicitud_id,
          nombre_modalidad,

        } = result.datos_produccion_general;

        this.registerProduccionGeneralForm.patchValue({

          // Form 1
          codigo,
          plan,
          eap,
          asignatura,
          tipo_asignatura,
          numero_formatos,
          situacion_asignatura,
          tipo_diseno,

          // Form 2
          fecha_inicio,
          tiempo_programado,
          fecha_programada,

          // Form 3
          asesor,
          telefono_asesor,
          correo_asesor,

          // Form 4
          decano,
          correo_decano,

          // Form 5
          docente_disenador,
          observacion_designacion,
          email_docente,
          telefono_docente,
          procedencia,
          designacion,
          
          // Form 6
          disenador_instruccional,
          telefono_instruccional,
          correo_instruccional,

          // Form 7
          responsable,
          video_presentacion,
          carpeta_entregable,

          // Form 8
          colaborativo,
          unidad1,
          unidad2,
          unidad3,
          unidad4,
          simulador,

          // Form 9
          fecha_presentacion_di,
          observaciones,
          fecha_finalizacion,
          correo_finalizacion,

        });

        this.modalidadName = nombre_modalidad;

        return result;

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

  getTipoDisenoQuery = injectQuery(() => ({
    queryKey: ['get-tipo-diseno'],
    queryFn: () => this.produccionGeneralService.getTipoDisenosApi()
  }));

  getEapQuery = injectQuery(() => ({
    queryKey: ['get-eap'],
    queryFn: () => this.solicitudDisenoCursoService.getEapApi()
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
      this.store.dispatch(setMessageFromUiDataAction({ message:putProduccionGeneralSuccessMessage }));
    }
  }));

  // Get
  getTipoDisenoOptions () {
    const result = this.getTipoDisenoQuery.data();
    if (!result) return [];
    const options:OptionDataIdNumber[] = result.map(({ id, nombre }) => ({ id, label:nombre }));
    return options;
  }

  getEapOptions () {
    const result = this.getEapQuery.data();
    if (!result) return [];
    const options:OptionDataIdNumber[] = result.map(({ id, nombre }) => ({ id, label:nombre }));
    return options;
  }

  // Toggle
  toggleIsRegisterPeriodoGeneralDialogOpen (modalidad:ModalidadEnum | null = null) {
    this.currentModalidadForModal = modalidad;
    this.isRegisterPeriodoGeneralDialogOpen = !this.isRegisterPeriodoGeneralDialogOpen;
  }
  
  toggleIsUploadSilaboDialogOpen () {
    this.isUploadSilaboDialogOpen = !this.isUploadSilaboDialogOpen;
  }

  // Redirect
  redirectToProduccionGeneral () {
    this.router.navigate(['/produccion-general']);
  }

  // Format Date
  formatDate (date:string) {
    const slicedDate = date.slice(0, 10);
    const restDate = date.slice(11, 16);
    return HandleDates.parseDateFormat1ToFormat2(slicedDate, 'YYYY-MM-DD', 'DD/MM/YYYY') + ' ' + restDate;
  }

  // Getters
  public get modalidadEnum (): typeof ModalidadEnum {
    return ModalidadEnum;
  }

}
