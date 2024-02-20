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
import { PostSolicitudDisenoCursoData } from '../../../api/solicitudes-diseno-curso/diseno-curso.types';

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

  // Options
  eapOptions:OptionData[] = [];
  tipoAsignaturaOptions:OptionData[] = [];
  tipoDisenoOptions:OptionData[] = [];
  facultadOptions:OptionData[] = [];
  planOptions:OptionData[] = [];

  modalidadOptions:OptionData[] = [
    { id:'0', label:'-' },
    { id:'1', label:'Presencial' },
    { id:'2', label:'Semipresencial' },
    { id:'3', label:'A Distacia' },
    { id:'4', label:'Presencial y a Distancia' },
    { id:'5', label:'Semipresencial y a Distancia' },
    { id:'6', label:'Presencial y Semipresencial' },
    { id:'7', label:'Presencial, Semipresencial y a Distancia' },
  ];

  presencialOptions:OptionData[] = [
    { id:'0', label:'-' },
    { id:'1', label:'Presencial' },
    { id:'2', label:'Virtual 16 Semanas' },
    { id:'3', label:'Virtual 8 Semanas' },
    { id:'4', label:'Blended 16 Semanas' },
    { id:'5', label:'Blended 8 Semanas' },
  ];

  semipresencialOptions:OptionData[] = [
    { id:'0', label:'-' },
    { id:'1', label:'Presencial 16 Semanas' },
    { id:'2', label:'Presencial 8 Semanas' },
    { id:'3', label:'Virtual 16 Semanas' },
    { id:'4', label:'Virtual 8 Semanas' },
    { id:'5', label:'Blended 16 Semanas' },
  ];

  aDistanciaOptions:OptionData[] = [
    { id:'0', label:'-' },
    { id:'1', label:'Presencial 16 Semanas' },
    { id:'2', label:'Presencial 8 Semanas' },
    { id:'3', label:'Virtual 16 Semanas' },
    { id:'4', label:'Virtual 8 Semanas' },
    { id:'5', label:'Blended 16 Semanas' },
  ];

  constructor (private fb:FormBuilder,) {

    this.registerCarpetaForm = this.fb.group({
      formato_presencial: [0, Validators.required],
      formato_semipresencial: [0, Validators.required],
      form_distancia: [0, Validators.required],
    });

    this.registerRequestForm = this.fb.group({
      codigo: ['Code 123', Validators.required],
      asignatura: ['Matemáticas', Validators.required],
      eap: [null, Validators.required],
      plan: [null, Validators.required],
      tipo_asignatura: [null, Validators.required],
      tipo_diseno: [null, Validators.required],
      facultad: [null, Validators.required],
      ciclo: [null, Validators.required],
      docente_diseñador: ['', Validators.required],
      modalidad: [null, Validators.required],
      formato: ['', Validators.required],
    });

  }

  // Select
  selectFirstOption (opt:FirstPossibleOptions) {
    this.firstOptionSelected = opt
  }

  selectSecondOption (opt:SecondPossibleOptions) {
    this.secondOptionSelected = opt
  }
   
  // Toggle
  toggleShouldShowCarpetas () {
    this.shouldShowCarpetas = !this.shouldShowCarpetas;
  }

  // Clean
  cleanFirstOption () {
    this.firstOptionSelected = null;
  }

  // On Submit
  onSubmitSolicitudDiseno () {

    const {
      codigo,
      asignatura,
      eap,
      plan,
      tipo_asignatura,
      tipo_diseno,
      facultad,
      docente_diseñador,
      modalidad,
      formato,
    } = this.registerRequestForm.value;

    const parsedBody:PostSolicitudDisenoCursoData = {
      adistancia:'1',
      asignatura,
      codigo,
      docente:docente_diseñador, 
      eap:eap.id.toString(),
      facultad:facultad.id.toString(),
      formato,
      modalidad:modalidad.id.toString(),
      plan:plan.label.toString(),
      presencial:'1',
      semipresencial:'1',
      tipo_asignatura:tipo_asignatura.id.toString(),
      tipo_diseno:tipo_diseno.id.toString(),
    }

  }

}

export type OptionData = {
  id:string;
  label:string;
}

export type OptionDataIdNumber = {
  id:number;
  label:string;
}

export type FirstPossibleOptions = null | 'Presencial' | 'SemipresencialDistancia';
export type SecondPossibleOptions = null | 'Presencial' | 'Presencial16Semanas';