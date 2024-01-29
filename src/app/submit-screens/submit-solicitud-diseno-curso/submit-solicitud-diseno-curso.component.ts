// Modules
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Components
import { NavigationContainerComponent } from '../../components/navigation-container/navigation-container.component';
import { DisenoCursoService } from '../../api/diseno-curso/diseno-curso.service';

@Component({
  selector: 'app-submit-solicitud-diseno-curso',
  standalone: true,
  imports: [
    ButtonModule,
    NavigationContainerComponent, 
    InputTextModule, 
    DropdownModule,
    ReactiveFormsModule
  ],
  templateUrl: './submit-solicitud-diseno-curso.component.html',
  styleUrl: './submit-solicitud-diseno-curso.component.scss'
})

export class SubmitSolicitudDisenoCursoComponent {

  registerRequestForm: FormGroup;

  constructor (
    private fb:FormBuilder,
    private disenoCursoService:DisenoCursoService
  ) {

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
      modalidad: ['', Validators.required],
      formato: ['', Validators.required],
    });

  }

}
