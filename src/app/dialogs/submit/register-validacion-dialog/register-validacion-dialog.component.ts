// Modules
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ActivatedRoute } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { injectMutation, injectQuery } from '@tanstack/angular-query-experimental';
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

        this.submitConfirmValidacionForm.controls['porcentaje_real'].disable();

        if (this.getPorcentajeReal() === 100) this.submitConfirmValidacionForm.controls['fecha_validacion'].disable();  

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
    { id:2, label:'Sí, con Observación' },
    { id:3, label:'No' },
    { id:4, label:'Observación' },
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

  // Get
  getPorcentajeReal () {

    const { 
      confirmacion_levantamiento, 
      presenta_guia_aprendizaje, 
      resultados_aprendizaje_guia_estudiante, 
      enlaces_e_hipervinculos_para_recursos, 
      actividades_propuestas, 
      foro_formativo, 
      objetos_aprendizaje 
    } = this.submitConfirmValidacionForm.value;

    if (
      (confirmacion_levantamiento == null) &&  
      (presenta_guia_aprendizaje == null) &&  
      (resultados_aprendizaje_guia_estudiante == null) &&  
      (enlaces_e_hipervinculos_para_recursos == null) &&  
      (actividades_propuestas == null) &&  
      (foro_formativo == null) &&  
      (objetos_aprendizaje == null) 
    ) return 0;

    return this.calculatePorcentajeReal(

      (confirmacion_levantamiento!.id === 1 || confirmacion_levantamiento!.id === 2) 
        ? 1 
        : 0,

      (presenta_guia_aprendizaje!.id === 1 || presenta_guia_aprendizaje!.id === 2)
        ? 1 
        : 0,

      (resultados_aprendizaje_guia_estudiante!.id === 1 || resultados_aprendizaje_guia_estudiante!.id === 2) 
        ? 1 
        : 0,

      (enlaces_e_hipervinculos_para_recursos!.id === 1 || enlaces_e_hipervinculos_para_recursos!.id === 2) 
        ? 1 
        : 0,

      (actividades_propuestas!.id === 1 || actividades_propuestas!.id === 2) 
        ? 1 
        : 0,

      (foro_formativo!.id === 1 || foro_formativo!.id === 2) 
        ? 1 
        : 0,

      (objetos_aprendizaje!.id === 1 || objetos_aprendizaje!.id === 2) 
        ? 1 
        : 0

    );
    
  }

  // Start
  startPostCompletarValidacionMutation () {

    this.submitConfirmValidacionForm.disable();

    const { 
      
      fecha_envio_validacion,
      
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

    const porcentaje_real = this.getPorcentajeReal();

    const payload:PostCompletarValidacionData = {

      id_produccion_general:this.currentProductionGeneralId!,
      
      fecha_envio_validacion,
      
      porcentaje_real:Number(porcentaje_real),
      
      carpeta_entregable,
      
      fecha_validacion,
      
      estado_avance_validacion:estado_avance_validacion!!.id,
      
      confirmacion_levantamiento:confirmacion_levantamiento!!.id,

      observacion_confirmacion_levantamiento: 
        (confirmacion_levantamiento!!.id === 2 || confirmacion_levantamiento!!.id === 4) 
          ? observacion_confirmacion_levantamiento 
          : '',
      
      presenta_guia_aprendizaje:presenta_guia_aprendizaje!!.id,

      observacion_presenta_guia_aprendizaje: 
        (presenta_guia_aprendizaje!!.id === 2 || presenta_guia_aprendizaje!!.id === 4) 
          ? observacion_presenta_guia_aprendizaje 
          : '',
      
      resultados_aprendizaje_guia_estudiante:resultados_aprendizaje_guia_estudiante!!.id,

      observacion_resultados_aprendizaje_guia_estudiante: 
        (resultados_aprendizaje_guia_estudiante!!.id === 2 || resultados_aprendizaje_guia_estudiante!!.id === 4)
          ? observacion_resultados_aprendizaje_guia_estudiante 
          : '',
      
      enlaces_e_hipervinculos_para_recursos:enlaces_e_hipervinculos_para_recursos!!.id,

      observacion_enlaces_e_hipervinculos_para_recursos: 
        (enlaces_e_hipervinculos_para_recursos!!.id === 2 || enlaces_e_hipervinculos_para_recursos!!.id === 4)
          ? observacion_enlaces_e_hipervinculos_para_recursos 
          : '',
      
      actividades_propuestas:actividades_propuestas!!.id,

      observacion_actividades_propuestas: 
        (actividades_propuestas!!.id === 2 || actividades_propuestas!!.id === 4)
          ? observacion_actividades_propuestas 
          : '',
      
      foro_formativo:foro_formativo!!.id,

      observacion_foro_formativo: 
        (foro_formativo!!.id === 2 || foro_formativo!!.id === 4)
          ? observacion_foro_formativo 
          : '',
      
      objetos_aprendizaje:objetos_aprendizaje!!.id,

      observacion_objetos_aprendizaje:
        (objetos_aprendizaje!!.id === 2 || objetos_aprendizaje!!.id === 4)
          ? observacion_objetos_aprendizaje 
          : '',
      
      pasa_implementacion:pasa_implementacion!!.id,

      observaciones_validador,
      
      observacion_scorm,

    }

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

  // Validate
  validateCanShowFechaEnvioValidacionInput () {
    const result = this.getPorcentajeReal();
    return (result === 100);
  }

  // Calculate
  calculatePorcentajeReal (
    confirmacion_levantamiento:number,
    presenta_guia_aprendizaje:number,
    resultados_aprendizaje_guia_estudiante:number,
    enlaces_e_hipervinculos_para_recursos:number,
    actividades_propuestas:number,
    foro_formativo:number,
    objetos_aprendizaje:number
  ) {
  
    const total = 
      confirmacion_levantamiento + 
      presenta_guia_aprendizaje + 
      resultados_aprendizaje_guia_estudiante + 
      enlaces_e_hipervinculos_para_recursos + 
      actividades_propuestas + 
      foro_formativo + 
      objetos_aprendizaje;
  
    return (total * 100) / 7;

  }

  // Getters
  get currentFormValue () { 
    return this.submitConfirmValidacionForm.value;
    
  }

}