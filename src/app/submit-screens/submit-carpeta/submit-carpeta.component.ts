// Modules
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Components
import { NavigationContainerComponent } from '../../components/navigation-container/navigation-container.component';

@Component({
  selector: 'app-submit-carpeta',
  standalone: true,
  imports: [
    ButtonModule, 
    InputTextModule, 
    NavigationContainerComponent, 
    ReactiveFormsModule, 
    DropdownModule,
  ],
  templateUrl: './submit-carpeta.component.html',
  styleUrl: './submit-carpeta.component.scss'
})

export class SubmitCarpetaComponent {

  registerCarpetaForm: FormGroup;

  modalidadOptions:OptionData[] = [
    { id:1, label:'Presencial' },
    { id:2, label:'Semipresencial' },
    { id:3, label:'A Distacia' },
    { id:4, label:'Presencial y a Distancia' },
    { id:5, label:'Semipresencial y a Distancia' },
    { id:6, label:'Presencial y Semipresencial' },
    { id:7, label:'Presencial, Semipresencial y a Distancia' },
  ];

  presencialOptions:OptionData[] = [
    { id:1, label:'Presencial' },
    { id:2, label:'Virtual 16 Semanas' },
    { id:3, label:'Virtual 8 Semanas' },
    { id:4, label:'Blended 16 Semanas' },
    { id:5, label:'Blended 8 Semanas' },
  ];

  semipresencialOptions:OptionData[] = [
    { id:1, label:'Presencial 16 Semanas' },
    { id:2, label:'Presencial 8 Semanas' },
    { id:3, label:'Virtual 16 Semanas' },
    { id:4, label:'Virtual 8 Semanas' },
    { id:5, label:'Blended 16 Semanas' },
  ];

  aDistanciaOptions:OptionData[] = [
    { id:1, label:'Presencial 16 Semanas' },
    { id:2, label:'Presencial 8 Semanas' },
    { id:3, label:'Virtual 16 Semanas' },
    { id:4, label:'Virtual 8 Semanas' },
    { id:5, label:'Blended 16 Semanas' },
  ];

  constructor (private fb:FormBuilder) {
      
    this.registerCarpetaForm = this.fb.group({
      modalidad: [1, Validators.required],
      formato_presencial: [1, Validators.required],
      formato_semipresencial: [1, Validators.required],
      form_distancia: [1, Validators.required],
    });

    this.onSubmit();

  }

  onSubmit () {
    const modalidad = this.registerCarpetaForm.get('modalidad')?.value;
    switch (modalidad) {
      case 1: return this.evaluateCase1();
      case 2: return this.evaluateCase2();
      case 3: return this.evaluateCase3();
      default: return console.log('IDK');
    }
  }

  evaluateCase1 () {
    const formato_presencial = this.registerCarpetaForm.get('formato_presencial')?.value;
    switch (formato_presencial) {
      case 1: return console.log('Presencial con carpeta presencial');
      case 2: return console.log('Presencial con carpeta virtual 16 semanas');
      case 3: return console.log('Presencial con carpeta virtual 8 semanas');
      case 4: return console.log('Presencial con carpeta blended 16 semanas');
      case 5: return console.log('Presencial con carpeta blended 8 semanas');
      default: return console.log('Presencial con carpeta presencial');
    }
  }

  evaluateCase2 () {
    const formato_semipresencial = this.registerCarpetaForm.get('formato_semipresencial')?.value;
    switch (formato_semipresencial) {
      case 1: return console.log('Semipresencial con carpeta presencial 16 semanas');
      case 2: return console.log('Semipresencial con carpeta presencial 8 semanas');
      case 3: return console.log('Semipresencial con carpeta virtual 16 semanas');
      case 4: return console.log('Semipresencial con carpeta virtual 8 semanas');
      case 5: return console.log('Semipresencial con carpeta blended 16 semanas');
      default: return console.log('Semipresencial con carpeta presencial 16 semanas');
    } 
  }

  evaluateCase3 () {
    const form_distancia = this.registerCarpetaForm.get('form_distancia')?.value;
    switch (form_distancia) {
      case 1: return console.log('A Distancia con carpeta presencial 16 semanas');
      case 2: return console.log('A Distancia con carpeta presencial 8 semanas');
      case 3: return console.log('A Distancia con carpeta virtual 16 semanas');
      case 4: return console.log('A Distancia con carpeta virtual 8 semanas');
      case 5: return console.log('A Distancia con carpeta blended 16 semanas');
      default: return console.log('A Distancia con carpeta presencial 16 semanas');
    }
  }

  evaluateCase4 () {}

}

export type OptionData = {
  id:number;
  label:string;
}