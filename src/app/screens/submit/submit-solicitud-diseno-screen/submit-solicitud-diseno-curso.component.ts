// Modules
import { CardModule } from 'primeng/card';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Components
import { CardWithSkeletonComponent } from '../../../components/card-with-skeleton/card-with-skeleton.component';
import { NavigationContainerComponent } from '../../../components/navigation-container/navigation-container.component';

// Service
import { DisenoCursoService } from '../../../api/diseno-curso/diseno-curso.service';

@Component({
  selector: 'app-submit-solicitud-diseno-curso',
  standalone: true,
  imports: [
    ButtonModule,
    NavigationContainerComponent, 
    InputTextModule, 
    DropdownModule,
    ReactiveFormsModule,
    MessageModule,
    CardModule,
    BreadcrumbModule,
    CardWithSkeletonComponent
  ],
  templateUrl: './submit-solicitud-diseno-curso.component.html',
  styleUrl: './submit-solicitud-diseno-curso.component.scss',
})

export class SubmitSolicitudDisenoCursoComponent {

  registerRequestForm: FormGroup;
  registerCarpetaForm: FormGroup;
  shouldShowCarpetas:boolean = false;
  firstOptionSelected:FirstPossibleOptions = null;
  secondOptionSelected:SecondPossibleOptions = null;

  modalidadOptions:OptionData[] = [
    { id:0, label:'-' },
    { id:1, label:'Presencial' },
    { id:2, label:'Semipresencial' },
    { id:3, label:'A Distacia' },
    { id:4, label:'Presencial y a Distancia' },
    { id:5, label:'Semipresencial y a Distancia' },
    { id:6, label:'Presencial y Semipresencial' },
    { id:7, label:'Presencial, Semipresencial y a Distancia' },
  ];

  presencialOptions:OptionData[] = [
    { id:0, label:'-' },
    { id:1, label:'Presencial' },
    { id:2, label:'Virtual 16 Semanas' },
    { id:3, label:'Virtual 8 Semanas' },
    { id:4, label:'Blended 16 Semanas' },
    { id:5, label:'Blended 8 Semanas' },
  ];

  semipresencialOptions:OptionData[] = [
    { id:0, label:'-' },
    { id:1, label:'Presencial 16 Semanas' },
    { id:2, label:'Presencial 8 Semanas' },
    { id:3, label:'Virtual 16 Semanas' },
    { id:4, label:'Virtual 8 Semanas' },
    { id:5, label:'Blended 16 Semanas' },
  ];

  aDistanciaOptions:OptionData[] = [
    { id:0, label:'-' },
    { id:1, label:'Presencial 16 Semanas' },
    { id:2, label:'Presencial 8 Semanas' },
    { id:3, label:'Virtual 16 Semanas' },
    { id:4, label:'Virtual 8 Semanas' },
    { id:5, label:'Blended 16 Semanas' },
  ];

  constructor (
    private fb:FormBuilder,
    private disenoCursoService:DisenoCursoService
  ) {

    this.registerCarpetaForm = this.fb.group({
      formato_presencial: [0, Validators.required],
      formato_semipresencial: [0, Validators.required],
      form_distancia: [0, Validators.required],
    });

    this.registerRequestForm = this.fb.group({
      codigo: ['', Validators.required],
      asignatura: ['', Validators.required],
      eap: ['', Validators.required],
      plan: ['', Validators.required],
      tipo_asignatura: ['', Validators.required],
      tipo_diseno: ['', Validators.required],
      facultad: ['', Validators.required],
      ciclo: ['', Validators.required],
      docente_diseñador: ['', Validators.required],
      modalidad: [0, Validators.required],
      formato: ['', Validators.required],
    });

  }

  selectFirstOption (opt:FirstPossibleOptions) {
    this.firstOptionSelected = opt
  }

  selectSecondOption (opt:SecondPossibleOptions) {
    this.secondOptionSelected = opt
  }
   
  toggleShouldShowCarpetas () {
    this.shouldShowCarpetas = !this.shouldShowCarpetas;
  }

  cleanFirstOption () {
    this.firstOptionSelected = null;
  }

}

export type OptionData = {
  id:number;
  label:string;
}

export type FirstPossibleOptions = null | 'Presencial' | 'SemipresencialDistancia';
export type SecondPossibleOptions = null | 'Presencial' | 'Presencial16Semanas';