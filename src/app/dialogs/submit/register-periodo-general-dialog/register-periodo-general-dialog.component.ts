// Modules
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { injectMutation } from '@tanstack/angular-query-experimental';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';

// Data
import { ratingOptions } from '../../../data/data.options';

// Services
import { MetodoService } from '../../../api/metodo/metodo.service';

// Types
import { PostMetodoData } from '../../../api/metodo/metodo.types';
import { OptionData } from '../../../screens/submit/submit-solicitud-diseno-screen/submit-solicitud-diseno-curso.component';

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

  metodoServices = inject(MetodoService)

  postMetodoMutation = injectMutation(() => ({
    mutationFn: (data:PostMetodoData) => this.metodoServices.postMetodoFromProduccionGeneralApi(data),
  }))

  constructor (private fb:FormBuilder, private activatedRoute:ActivatedRoute) {}

  formatoForm = this.fb.group ({

    horas_sincronas: ['10', Validators.required],
    horas_asincronas: ['10', Validators.required],
    intro_evaluacion_entrada: [ratingOptions[0] as OptionData | null, Validators.required],
    intro_hoja_calendario: [ratingOptions[0] as OptionData | null, Validators.required],
    lecturas: [ratingOptions[0] as OptionData | null, Validators.required],

    u1_autoevaluacion: [ratingOptions[0] as OptionData | null, Validators.required],
    u1_ppt: [ratingOptions[0] as OptionData | null, Validators.required],
    u1_guia: [ratingOptions[0] as OptionData | null, Validators.required],
    u1_pa2: [ratingOptions[0] as OptionData | null, Validators.required],

    u2_autoevaluacion: [ratingOptions[0] as OptionData | null, Validators.required],
    u2_ppt: [ratingOptions[0] as OptionData | null, Validators.required],
    u2_guia: [ratingOptions[0] as OptionData | null, Validators.required],
    u2_pa2: [ratingOptions[0] as OptionData | null, Validators.required],

    u3_autoevaluacion: [ratingOptions[0] as OptionData | null, Validators.required],
    u3_ppt: [ratingOptions[0] as OptionData | null, Validators.required],
    u3_guia: [ratingOptions[0] as OptionData | null, Validators.required],
    u3_pa2: [ratingOptions[0] as OptionData | null, Validators.required],

  });

  // Close
  closeRegister () {
    this.closeDialogEmitter.emit();
    this.formatoForm.reset();
  }

  public get ratingOptions() {
    return ratingOptions;
  }

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
      modalidad:'',
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
  
}
