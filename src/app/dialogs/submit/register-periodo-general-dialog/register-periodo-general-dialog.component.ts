// Modules
import { Store } from '@ngrx/store';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { injectMutation, injectQuery } from '@tanstack/angular-query-experimental';

// Actions
import { setMessageFromUiDataAction } from '../../../state/actions/ui-actions';

// Data
import { RatingValue, ratingOptions } from '../../../data/data.options';

// Messages
import { 
  getMetodoSuccessMessage, 
  noMetodoAlreadySavedMessage, 
  porcentajeRealWasCompleteAtTheBeginningMessageButNotNow, 
  postMetodoErrorMessage,
  postMetodoEveryRegisterIsAt100PercentSuccessMessage, 
  postMetodoEveryRegisterIsNotAt100PercentSuccessMessage, 
} from '../../../data/data.messages';

// Services
import { MetodoService } from '../../../api/metodo/metodo.service';
import { ProduccionService } from '../../../api/produccion/produccion.service';

// Types
import { GetAllMetodosData, PostMetodoWithCalculoData } from '../../../api/metodo/metodo.types';
import { GetGenerateEmailWhenFormatoWasCompletedButAlreadyNotData } from '../../../api/produccion/produccion.types';
import CalculatePorcentajeAvanceHelper, { DataForCalculatePorcentajeAvance } from '../../../helpers/calculate-porcentaje-avance-helper';

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
  @Input() currentFormato:string | null = null;
  @Input() currentInitDate:string | null = null;
  @Input() currentModalidad:string | null = null;
  @Input() currentFormatoName:string | null = null;
  @Input() allFormatosFromModalidad:GetAllMetodosData[] = [];
  @Output() closeDialogEmitter = new EventEmitter(); 

  // Vars
  wasCurrentFormatCompleteAtTheBeginning = false;
  currentProduccionGeneralId = this.activatedRoute.snapshot.params['id'];

  // Injects
  metodoServices = inject(MetodoService);
  produccionServices = inject(ProduccionService);

  constructor (
    private fb:FormBuilder, 
    private activatedRoute:ActivatedRoute,
    private store:Store
  ) {}

  // Forms
  formatoForm = this.fb.group ({

    horas_sincronas: [0],
    horas_asincronas: [0],
    intro_evaluacion_entrada: [null as RatingValue | null],
    intro_hoja_calendario: [null as RatingValue | null],
    lecturas: [null as RatingValue | null],

    u1_autoevaluaciones: [null as RatingValue | null],
    u1_ppt: [null as RatingValue | null],
    u1_guia: [null as RatingValue | null],
    u1_pa1: [null as RatingValue | null],
    u1_recurso_innovador: [null as RatingValue | null],

    u2_autoevaluaciones: [null as RatingValue | null],
    u2_ppt: [null as RatingValue | null],
    u2_guia: [null as RatingValue | null],
    u2_pa2: [null as RatingValue | null],
    u2_recurso_innovador: [null as RatingValue | null],

    u3_autoevaluaciones: [null as RatingValue | null],
    u3_ppt: [null as RatingValue | null],
    u3_guia: [null as RatingValue | null],
    u3_pa3: [null as RatingValue | null],
    u3_recurso_innovador: [null as RatingValue | null],

    u4_autoevaluaciones: [null as RatingValue | null],
    u4_ppt: [null as RatingValue | null],
    u4_guia: [null as RatingValue | null],
    u4_pa4: [null as RatingValue | null],
    u4_recurso_innovador: [null as RatingValue | null],

  });

  // Queries
  postMetodoMutation = injectMutation(() => ({

    mutationFn: (data:PostMetodoWithCalculoData) => this.metodoServices.patchMetodoFromProduccionGeneralApi(data),

    onSuccess: () => {

      const result = this.validateOnSuccessFormatoWasCompleteAtTheBeginning();

      if (result) {

        this.showMessageIfFormatoWasCompleteAtTheBeginning();

        this.startSubmitGenerateEmailWhenFormatoWasCompletedButAlreadyNot();

      } else {

        

      }

      this.formatoForm.enable();  

      this.closeRegister();

    },

    onError: () => {

      this.formatoForm.enable();

      this.store.dispatch(setMessageFromUiDataAction({ message:postMetodoErrorMessage }));

    }

  }));

  postGenerateEmailWhenFormatoWasCompletedButAlreadyNotMutation = injectMutation(() => ({

    mutationFn: (data:GetGenerateEmailWhenFormatoWasCompletedButAlreadyNotData) => this.produccionServices.generateEmailWhenFormatoWasCompletedButAlreadyNotApi(data),

  }));

  getMetodoQuery = injectQuery(() => ({

    queryKey: ['get-metodo'],

    queryFn: async () => {

      const result = await this.metodoServices.getMetodoWithModalidadAndFormato({ 
        id_produccion_general:this.currentProduccionGeneralId, 
        formato:this.currentFormato!,
        modalidad:this.currentModalidad!
      });

      if (result.data.length === 0) {

        this.store.dispatch(setMessageFromUiDataAction({ message:noMetodoAlreadySavedMessage }));

        return null;
        
      }

      const {

        horas_asincronas,
        horas_sincronas,
        evaluacion_entrada,
        hoja_calendario,
        lecturas,

        u1_autoevaluaciones,
        u1_ppt,
        u1_guia,
        u1_pa1,
        u1_recurso_innovador,

        u2_autoevaluaciones,
        u2_ppt,
        u2_guia,
        u2_pa2,
        u2_recurso_innovador,

        u3_autoevaluaciones,
        u3_ppt,
        u3_guia,
        u3_pa3,
        u3_recurso_innovador,

        u4_autoevaluaciones,
        u4_ppt,
        u4_guia,
        u4_pa4,
        u4_recurso_innovador,

      } = result.data[0];

      this.formatoForm.patchValue({

        horas_sincronas:horas_sincronas === '' ? 0 : Number(horas_sincronas),
        horas_asincronas:horas_asincronas === '' ? 0 : Number(horas_asincronas),

        intro_evaluacion_entrada:this.parseValueToOption(evaluacion_entrada as number),
        intro_hoja_calendario:this.parseValueToOption(hoja_calendario as number),
        lecturas:this.parseValueToOption(lecturas as number),

        u1_autoevaluaciones:this.parseValueToOption(u1_autoevaluaciones as number),
        u1_ppt:this.parseValueToOption(u1_ppt as number),
        u1_guia:this.parseValueToOption(u1_guia as number),
        u1_pa1:this.parseValueToOption(u1_pa1 as number),
        u1_recurso_innovador:this.parseValueToOption(u1_recurso_innovador as number),

        u2_autoevaluaciones:this.parseValueToOption(u2_autoevaluaciones as number),
        u2_ppt:this.parseValueToOption(u2_ppt as number),
        u2_guia:this.parseValueToOption(u2_guia as number),
        u2_pa2:this.parseValueToOption(u2_pa2 as number),
        u2_recurso_innovador:this.parseValueToOption(u2_recurso_innovador as number),

        u3_autoevaluaciones:this.parseValueToOption(u3_autoevaluaciones as number),
        u3_ppt:this.parseValueToOption(u3_ppt as number),
        u3_guia:this.parseValueToOption(u3_guia as number),
        u3_pa3:this.parseValueToOption(u3_pa3 as number),
        u3_recurso_innovador:this.parseValueToOption(u3_recurso_innovador as number),

        u4_autoevaluaciones:this.parseValueToOption(u4_autoevaluaciones as number),
        u4_ppt:this.parseValueToOption(u4_ppt as number),
        u4_guia:this.parseValueToOption(u4_guia as number),
        u4_pa4:this.parseValueToOption(u4_pa4 as number),
        u4_recurso_innovador:this.parseValueToOption(u4_recurso_innovador as number),
        
      });

      this.wasCurrentFormatCompleteAtTheBeginning = this.validateWasFormatCompletedAtTheBeginning();

      this.store.dispatch(setMessageFromUiDataAction({ message:getMetodoSuccessMessage }));

      return result.data[0];

    },

    enabled:false,

  }));

  // Close
  closeRegister () {
    this.closeDialogEmitter.emit();
    this.formatoForm.reset();
  }

  // Start
  startSubmitMetodo () {

    this.formatoForm.disable();

    const payload = this.getFormValue();

    this.postMetodoMutation.mutate(payload);

  }

  startSubmitGenerateEmailWhenFormatoWasCompletedButAlreadyNot () {

    const formValues = this.getFormValue();

    this.postGenerateEmailWhenFormatoWasCompletedButAlreadyNotMutation.mutate({ curso:'Curso', porcentaje:formValues.porcentaje });

  }

  // Parse
  parseValueToOption (value:number) {
    switch (value) {
      case 0: return ratingOptions[0];
      case 0.5: return ratingOptions[1];
      case 1: return ratingOptions[2];
      default: return ratingOptions[0];
    }
  }

  // Get
  getFormValue () {

    const { 
      
      horas_sincronas,
      horas_asincronas,

      intro_evaluacion_entrada,
      intro_hoja_calendario,
      lecturas,
      u1_autoevaluaciones,
      u1_ppt,
      u1_guia,
      u1_pa1,
      u1_recurso_innovador,

      u2_autoevaluaciones,
      u2_ppt,
      u2_guia,
      u2_pa2,
      u2_recurso_innovador,

      u3_autoevaluaciones,
      u3_ppt,
      u3_guia,
      u3_pa3,
      u3_recurso_innovador,

      u4_autoevaluaciones,
      u4_ppt,
      u4_guia,
      u4_pa4,
      u4_recurso_innovador,

    } = this.formatoForm.value;

    const calculoPayload:DataForCalculatePorcentajeAvance = {

      evaluacion_entrada:intro_evaluacion_entrada?.value || ratingOptions[0].value,
      hoja_calendario:intro_hoja_calendario?.value || ratingOptions[0].value,
      lecturas:lecturas?.value || ratingOptions[0].value,
      u1_autoevaluaciones:u1_autoevaluaciones?.value || ratingOptions[0].value,
      u1_ppt:u1_ppt?.value || ratingOptions[0].value,
      u1_guia:u1_guia?.value || ratingOptions[0].value,
      u1_pa1:u1_pa1?.value || ratingOptions[0].value,
      u1_recurso_innovador:u1_recurso_innovador?.value || ratingOptions[0].value,

      u2_autoevaluaciones:u2_autoevaluaciones?.value || ratingOptions[0].value,
      u2_ppt:u2_ppt?.value || ratingOptions[0].value,
      u2_guia:u2_guia?.value || ratingOptions[0].value,
      u2_pa2:u2_pa2?.value || ratingOptions[0].value,
      u2_recurso_innovador:u2_recurso_innovador?.value || ratingOptions[0].value,

      u3_autoevaluaciones:u3_autoevaluaciones?.value || ratingOptions[0].value,
      u3_ppt:u3_ppt?.value || ratingOptions[0].value,
      u3_guia:u3_guia?.value || ratingOptions[0].value,
      u3_pa3:u3_pa3?.value || ratingOptions[0].value,
      u3_recurso_innovador:u3_recurso_innovador?.value || ratingOptions[0].value,

      u4_autoevaluaciones:u4_autoevaluaciones?.value || ratingOptions[0].value,
      u4_ppt:u4_ppt?.value || ratingOptions[0].value,
      u4_guia:u4_guia?.value || ratingOptions[0].value,
      u4_pa4:u4_pa4?.value || ratingOptions[0].value,
      u4_recurso_innovador:u4_recurso_innovador?.value || ratingOptions[0].value,

    }

    const porcentaje = CalculatePorcentajeAvanceHelper.calculatePorcentajeAvance(calculoPayload);

    const payload:PostMetodoWithCalculoData = {
      id_produccion_general: this.activatedRoute.snapshot.params['id'],
      modalidad:this.currentModalidad!,
      formato:this.currentFormato!,
      horas_asincronas:horas_asincronas!,
      horas_sincronas:horas_sincronas!,
      ...calculoPayload,
      porcentaje,
      fecha_inicio:this.currentInitDate!,
    }

    return payload;

  }

  // Show
  showMessageIfEveryRegisterIsAt100Percentage () {
    const result = this.validateIsEveryRegisterAt100PercentagePost();
    (result) 
      ? this.store.dispatch(setMessageFromUiDataAction({ message:postMetodoEveryRegisterIsAt100PercentSuccessMessage }))
      : this.store.dispatch(setMessageFromUiDataAction({ message:postMetodoEveryRegisterIsNotAt100PercentSuccessMessage }));
  }

  showMessageIfFormatoWasCompleteAtTheBeginning () {

    const formValue = this.getFormValue();

    if (formValue.porcentaje !== 100 && this.wasCurrentFormatCompleteAtTheBeginning) 

      this.store.dispatch(setMessageFromUiDataAction({ message:porcentajeRealWasCompleteAtTheBeginningMessageButNotNow }));

  }

  // Validate
  validateIsEveryRegisterAt100PercentagePost () {

    const { porcentaje } = this.getFormValue();

    const formatosAndPercentages = this.allFormatosFromModalidad
      .filter(({ formato }) => formato !== Number(this.currentFormato!))
      .map(({ metodos_data, formato }) => {
        const porcentaje = CalculatePorcentajeAvanceHelper.calculatePorcentajeAvance(metodos_data);
        return ({ formato, porcentaje });
      })
      .filter(({ porcentaje }) => porcentaje !== 100);

    return (formatosAndPercentages.length === 0) && (porcentaje === 100);

  }

  validateWasFormatCompletedAtTheBeginning () {
    const result = this.getFormValue();
    return (result.porcentaje === 100);
  }

  validateOnSuccessFormatoWasCompleteAtTheBeginning () {
    const result = this.getFormValue();
    return (result.porcentaje !== 100) && this.wasCurrentFormatCompleteAtTheBeginning;
  }

  // Getters
  public get ratingOptions() {
    return ratingOptions;
  }

}
