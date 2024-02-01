// Modules
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

// Components
import { NavigationContainerComponent } from '../../components/navigation-container/navigation-container.component';

// Types
import { GetDisenoCursoData } from '../../api/diseno-curso/diseno-curso.types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solicitudes-diseno-curso',
  standalone: true,
  imports: [NavigationContainerComponent, ButtonModule, TableModule],
  templateUrl: './solicitudes-diseno-curso.component.html',
  styleUrl: './solicitudes-diseno-curso.component.scss'
})

export class SolicitudesDisenoCursoComponent {

  constructor (private router:Router) { 
    
  }

  requestList:GetDisenoCursoData[] = [
    dummyRequest,
    dummyRequest,
    dummyRequest,
  ]

  redirectToSubmitRequest() {
    this.router.navigate(['/submit-solicitud-diseno-curso'])
  }

}

const dummyRequest:GetDisenoCursoData = { 
  asignatura:'Asignatura 1',
  ciclo:'Ciclo 1',
  codigo:'Codigo 1',
  docente_disenador:'Docente 1',
  eap:'EAP 1',
  facultad:'Facultad 1',
  formato:'Formato 1',
  id:'1',
  modalidad:'Modalidad 1',
  plan:'Plan 1',
  tipo_asignatura:'Tipo Asignatura 1',
  tipo_diseno:'Tipo Diseno 1'
}