// Modules
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ActivatedRoute } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { injectMutation, injectQuery } from '@tanstack/angular-query-experimental';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// Actions
import { setMessageFromUiDataAction } from '../../../state/actions/ui-actions';

// Data
import { completarValidacionSuccessMessage, getCompletarValidacionSuccessMessage } from '../../../data/data.messages';

// Services
import { ValidacionService } from '../../../api/validacion/validacion.service';

// Types
import { PostCompletarValidacionData } from '../../../api/validacion/validacion.types';
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
  @Input() selectedRow:number | null = null;
  @Output() closeDialogEmitter = new EventEmitter();

  // Vars
  currentProductionGeneralId = this.activatedRoute.snapshot.params['id'];

  // Inject
  validacionService = inject(ValidacionService);

  // Queries
  getValidacionByIdQuery = injectQuery(() => ({

    queryKey:['get-confirmar-validacion-by-id', this.selectedRow!],

    queryFn: async () => {

      try {

        const result = await this.validacionService.getConfirmarValidacionApi(this.currentProductionGeneralId!);

        const {

          fecha_envio_validacion,
          porcentaje_real,
          carpeta_entregable,
          fecha_validacion,

          estado_avance_validacion,

          confirmacion_levantamiento,
          observacion_confirmacion_levantamiento,

          presenta_guia_aprendizaje,
          observacion_presenta_guia_aprendizaje,

          resultados_aprendizaje_guia_estudiante,
          observacion_resultados_aprendizaje_guia_estudiante,

          enlaces_e_hipervinculos_para_recursos,
          observacion_enlaces_e_hipervinculos_para_recursos,

          actividades_propuestas,
          observacion_actividades_propuestas,

          foro_formativo,
          observacion_foro_formativo,

          objetos_aprendizaje,
          observacion_objetos_aprendizaje,

          pasa_implementacion,

          observaciones_validador,

          observacion_scorm,

        } = result.data[0];

        this.submitConfirmValidacionForm.patchValue({

          fecha_envio_validacion,
          porcentaje_real,
          carpeta_entregable,
          fecha_validacion,

          estado_avance_validacion:this.matchidWithEstadoAvanceValidacionOption(estado_avance_validacion),

          confirmacion_levantamiento:this.matchIdWithSiNoObservacionOption(confirmacion_levantamiento),
          observacion_confirmacion_levantamiento,

          presenta_guia_aprendizaje:this.matchIdWithSiNoObservacionOption(presenta_guia_aprendizaje),
          observacion_presenta_guia_aprendizaje,

          resultados_aprendizaje_guia_estudiante:this.matchIdWithSiNoObservacionOption(resultados_aprendizaje_guia_estudiante),
          observacion_resultados_aprendizaje_guia_estudiante,

          enlaces_e_hipervinculos_para_recursos:this.matchIdWithSiNoObservacionOption(enlaces_e_hipervinculos_para_recursos),
          observacion_enlaces_e_hipervinculos_para_recursos,

          actividades_propuestas:this.matchIdWithSiNoObservacionOption(actividades_propuestas),
          observacion_actividades_propuestas,

          foro_formativo:this.matchIdWithSiNoObservacionOption(foro_formativo),
          observacion_foro_formativo,

          objetos_aprendizaje:this.matchIdWithSiNoObservacionOption(objetos_aprendizaje),
          observacion_objetos_aprendizaje,

          pasa_implementacion:this.matchIdWithSiNoObservacionOption(pasa_implementacion),

          observaciones_validador,

          observacion_scorm,

        });

        this.store.dispatch(setMessageFromUiDataAction({ message:getCompletarValidacionSuccessMessage }));

        return result.data[0];

      } catch (error) {

        return null;

      }

    },

    enabled:false

  }));

  postCompletarValidacionMutation = injectMutation(() => ({

    mutationFn: (data:PostCompletarValidacionData) => this.validacionService.postCompletarValidacionApi(data),

    onSuccess: () => {

      this.store.dispatch(setMessageFromUiDataAction({ message:completarValidacionSuccessMessage }));

      this.closeAndCleanDialog();

      this.submitConfirmValidacionForm.enable();

    },

    onError: () => {

      this.submitConfirmValidacionForm.enable();

    }
    
  }));

  constructor (
    private fb:FormBuilder, 
    private store:Store,
    private activatedRoute:ActivatedRoute
  ) {}

  // Options
  estadoAvanceValidacionOptions:OptionDataIdNumber[] = [
    { id:1, label:'25%-1U,' },
    { id:2, label:'50%-2U,' },
    { id:3, label:'75%-3U,' },
    { id:4, label:'100%-4U,' },
  ]

  siNoObservacionOptions:OptionDataIdNumber[] = [
    { id:1, label:'Sí' },
    { id:2, label:'No' },
    { id:3, label:'Observación' },
  ]

  // Forms
  submitConfirmValidacionForm:FormGroup = this.fb.group ({

    // Type
    
    fecha_envio_validacion: ['', Validators.required],
    
    porcentaje_real: ['', Validators.required],
    
    carpeta_entregable: ['', Validators.required],
    
    fecha_validacion: ['', Validators.required],

    estado_avance_validacion: [null as (OptionData | null), Validators.required],

    confirmacion_levantamiento: [null as (OptionData | null), Validators.required],
    observacion_confirmacion_levantamiento: [''],

    presenta_guia_aprendizaje: [null as (OptionData | null), Validators.required],    
    observacion_presenta_guia_aprendizaje: [''],

    resultados_aprendizaje_guia_estudiante: [null as (OptionData | null), Validators.required],
    observacion_resultados_aprendizaje_guia_estudiante: [''],

    enlaces_e_hipervinculos_para_recursos: [null as (OptionData | null), Validators.required],
    observacion_enlaces_e_hipervinculos_para_recursos: [''],

    actividades_propuestas: [null as (OptionData | null), Validators.required],
    observacion_actividades_propuestas: [''],

    foro_formativo: [null as (OptionData | null), Validators.required],
    observacion_foro_formativo: [''],

    objetos_aprendizaje: [null as (OptionData | null), Validators.required],
    observacion_objetos_aprendizaje: [''],

    pasa_implementacion: [null as (OptionData | null), Validators.required],

    observaciones_validador: [null as (OptionData | null), Validators.required],
    
    observacion_scorm: ['', Validators.required]    

  });

  // Start
  startPostCompletarValidacionMutation () {

    this.submitConfirmValidacionForm.disable();

    const { 
      
      fecha_envio_validacion,
      
      porcentaje_real,
      
      carpeta_entregable,
      
      fecha_validacion,
      
      estado_avance_validacion,
      
      confirmacion_levantamiento,
      observacion_confirmacion_levantamiento,
      
      presenta_guia_aprendizaje,
      observacion_presenta_guia_aprendizaje,
      
      resultados_aprendizaje_guia_estudiante,
      observacion_resultados_aprendizaje_guia_estudiante,
      
      enlaces_e_hipervinculos_para_recursos,
      observacion_enlaces_e_hipervinculos_para_recursos,
      
      actividades_propuestas,
      observacion_actividades_propuestas,
      
      foro_formativo,
      observacion_foro_formativo,
      
      objetos_aprendizaje,
      observacion_objetos_aprendizaje,
      
      observaciones_validador,
      
      pasa_implementacion,
      
      observacion_scorm,

    } = this.submitConfirmValidacionForm.value;

    const payload:PostCompletarValidacionData = {

      id_produccion_general:this.currentProductionGeneralId!,
      
      fecha_envio_validacion,
      
      porcentaje_real:Number(porcentaje_real),
      
      carpeta_entregable,
      
      fecha_validacion,
      
      estado_avance_validacion:estado_avance_validacion!!.id,
      
      confirmacion_levantamiento:confirmacion_levantamiento!!.id,
      observacion_confirmacion_levantamiento:(confirmacion_levantamiento!!.id === 3) ? observacion_confirmacion_levantamiento : '',
      
      presenta_guia_aprendizaje:presenta_guia_aprendizaje!!.id,
      observacion_presenta_guia_aprendizaje:(presenta_guia_aprendizaje!!.id === 3) ? observacion_presenta_guia_aprendizaje : '',
      
      resultados_aprendizaje_guia_estudiante:resultados_aprendizaje_guia_estudiante!!.id,
      observacion_resultados_aprendizaje_guia_estudiante:(resultados_aprendizaje_guia_estudiante!!.id === 3) ? observacion_resultados_aprendizaje_guia_estudiante : '',
      
      enlaces_e_hipervinculos_para_recursos:enlaces_e_hipervinculos_para_recursos!!.id,
      observacion_enlaces_e_hipervinculos_para_recursos:(enlaces_e_hipervinculos_para_recursos!!.id === 3) ? observacion_enlaces_e_hipervinculos_para_recursos : '',
      
      actividades_propuestas:actividades_propuestas!!.id,
      observacion_actividades_propuestas:(actividades_propuestas!!.id === 3) ? observacion_actividades_propuestas : '',
      
      foro_formativo:foro_formativo!!.id,
      observacion_foro_formativo:(foro_formativo!!.id === 3) ? observacion_foro_formativo : '',
      
      objetos_aprendizaje:objetos_aprendizaje!!.id,
      observacion_objetos_aprendizaje:(objetos_aprendizaje!!.id === 3) ? observacion_objetos_aprendizaje : '',
      
      pasa_implementacion:pasa_implementacion!!.id,

      observaciones_validador,
      
      observacion_scorm,

    }

    console.log('payload', payload);

    this.postCompletarValidacionMutation.mutate(payload)

  }

  // Close
  closeAndCleanDialog () {
    this.closeDialogEmitter.emit();
    this.submitConfirmValidacionForm.reset();
  }

  // Match
  matchIdWithSiNoObservacionOption (id:number) {
    return this.siNoObservacionOptions[id-1];
  }

  matchidWithEstadoAvanceValidacionOption (id:number) {
    return this.estadoAvanceValidacionOptions[id-1];
  }

  get currentFormValue () { 
    return this.submitConfirmValidacionForm.value;
  }

}