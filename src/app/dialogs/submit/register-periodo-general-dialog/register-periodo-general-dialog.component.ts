// Modules
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { injectMutation, injectQuery } from '@tanstack/angular-query-experimental';

// Data
import { ratingOptions } from '../../../data/data.options';

// Services
import { MetodoService } from '../../../api/metodo/metodo.service';

// Types
import { GetMetodoByProduccionGeneralIdModalidadAndFormatoData, PostMetodoData } from '../../../api/metodo/metodo.types';
import { OptionData } from '../../../screens/submit/submit-solicitud-diseno-screen/submit-solicitud-diseno-curso.component';
import { Store } from '@ngrx/store';
import { setMessageFromUiDataAction } from '../../../state/actions/ui-actions';
import { getMetodoSuccessMessage } from '../../../data/data.messages';

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
  @Input() currentModalidad:string | null = null;
  @Input() currentFormatoName:string | null = null;
  @Output() closeDialogEmitter = new EventEmitter(); 

  // Vars
  currentProduccionGeneralId = this.activatedRoute.snapshot.params['id'];

  // Injects
  metodoServices = inject(MetodoService);

  constructor (
    private fb:FormBuilder, 
    private activatedRoute:ActivatedRoute,
    private store:Store
  ) {}

  // Queries
  postMetodoMutation = injectMutation(() => ({
    mutationFn: (data:PostMetodoData) => this.metodoServices.patchMetodoFromProduccionGeneralApi(data),
  }));

  getMetodoQuery = injectQuery(() => ({

    queryKey: ['get-metodo'],

    queryFn: async () => {

      const result = await this.metodoServices.getMetodoWithModalidadAndFormato({ 
        id_produccion_general:this.currentProduccionGeneralId, 
        formato:this.currentFormato!,
        modalidad:this.currentModalidad!
      });

      if (result.data.length === 0) return;

      const {
        horas_asincronas,
        horas_sincronas,
        evaluacion_entrada,
        hoja_calendario,
        lecturas,
        u1_autoevaluacion,
        u1_ppt,
        u1_guia,
        u1_pa1,
        u2_autoevaluacion,
        u2_ppt,
        u2_guia,
        u2_pa2,
        u3_autoevaluacion,
        u3_ppt,
        u3_guia,
        u3_pa3,
      } = result.data[0];

      this.formatoForm.patchValue({
        horas_sincronas:horas_sincronas.toString(),
        horas_asincronas:horas_asincronas.toString(),
        intro_evaluacion_entrada:this.parseValueToOption(evaluacion_entrada as number),
        intro_hoja_calendario:this.parseValueToOption(hoja_calendario as number),
        lecturas:this.parseValueToOption(lecturas as number),
        u1_autoevaluacion:this.parseValueToOption(u1_autoevaluacion as number),
        u1_ppt:this.parseValueToOption(u1_ppt as number),
        u1_guia:this.parseValueToOption(u1_guia as number),
        u1_pa2:this.parseValueToOption(u1_pa1 as number),
        u2_autoevaluacion:this.parseValueToOption(u2_autoevaluacion as number),
        u2_ppt:this.parseValueToOption(u2_ppt as number),
        u2_guia:this.parseValueToOption(u2_guia as number),
        u2_pa2:this.parseValueToOption(u2_pa2 as number),
        u3_autoevaluacion:this.parseValueToOption(u3_autoevaluacion as number),
        u3_ppt:this.parseValueToOption(u3_ppt as number),
        u3_guia:this.parseValueToOption(u3_guia as number),
        u3_pa2:this.parseValueToOption(u3_pa3 as number),
      });

      this.store.dispatch(setMessageFromUiDataAction({ message:getMetodoSuccessMessage }));

    },

    enabled:false,

  }));

  formatoForm = this.fb.group ({

    horas_sincronas: ['', Validators.required],
    horas_asincronas: ['', Validators.required],
    intro_evaluacion_entrada: [null as OptionData | null, Validators.required],
    intro_hoja_calendario: [null as OptionData | null, Validators.required],
    lecturas: [null as OptionData | null, Validators.required],

    u1_autoevaluacion: [null as OptionData | null, Validators.required],
    u1_ppt: [null as OptionData | null, Validators.required],
    u1_guia: [null as OptionData | null, Validators.required],
    u1_pa2: [null as OptionData | null, Validators.required],

    u2_autoevaluacion: [null as OptionData | null, Validators.required],
    u2_ppt: [null as OptionData | null, Validators.required],
    u2_guia: [null as OptionData | null, Validators.required],
    u2_pa2: [null as OptionData | null, Validators.required],

    u3_autoevaluacion: [null as OptionData | null, Validators.required],
    u3_ppt: [null as OptionData | null, Validators.required],
    u3_guia: [null as OptionData | null, Validators.required],
    u3_pa2: [null as OptionData | null, Validators.required],

  });

  // Close
  closeRegister () {
    this.closeDialogEmitter.emit();
    this.formatoForm.reset();
  }

  // Getters
  public get ratingOptions() {
    return ratingOptions;
  }

  // Start
  startSubmitMetodo () {

    const { 
      
      horas_sincronas,
      horas_asincronas,
      intro_evaluacion_entrada,
      intro_hoja_calendario,
      lecturas,

      u1_autoevaluacion,
      u1_ppt,
      u1_guia,
      u1_pa2,

      u2_autoevaluacion,
      u2_ppt,
      u2_guia,
      u2_pa2,

      u3_autoevaluacion,
      u3_ppt,
      u3_guia,
      u3_pa2,

    } = this.formatoForm.value;

    const payload:PostMetodoData = {

      id_produccion_general: this.activatedRoute.snapshot.params['id'],
      modalidad:this.currentModalidad!,
      formato:this.currentFormato!,

      horas_asincronas:horas_asincronas!,
      horas_sincronas:horas_sincronas!,
      evaluacion_entrada:intro_evaluacion_entrada!.id,
      hoja_calendario:intro_hoja_calendario!.id,
      lecturas:lecturas!.id,

      u1_autoevaluacion:u1_autoevaluacion!.id,
      u1_ppt:u1_ppt!.id,
      u1_guia:u1_guia!.id,
      u1_pa1:u1_pa2!.id,

      u2_autoevaluacion:u2_autoevaluacion!.id,
      u2_ppt:u2_ppt!.id,
      u2_guia:u2_guia!.id,
      u2_pa2:u2_pa2!.id,

      u3_autoevaluacion:u3_autoevaluacion!.id,
      u3_ppt:u3_ppt!.id,
      u3_guia:u3_guia!.id,
      u3_pa3:u3_pa2!.id,

    }

    this.postMetodoMutation.mutate(payload);

  }

  parseValueToOption (value:number) {
    switch (value) {
      case 0: return ratingOptions[0];
      case 1: return ratingOptions[1];
      default: return ratingOptions[2];
    }
  }
  
}
