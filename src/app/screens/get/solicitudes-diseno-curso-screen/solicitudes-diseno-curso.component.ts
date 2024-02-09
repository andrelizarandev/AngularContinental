// Modules
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

// Components
import { CardWithSkeletonComponent } from '../../../components/card-with-skeleton/card-with-skeleton.component';
import { NavigationContainerComponent } from '../../../components/navigation-container/navigation-container.component';

// Types
import { GetSolicitudDisenoCursoData } from '../../../api/solicitudes-diseno-curso/diseno-curso.types';

@Component({
  selector: 'app-solicitudes-diseno-curso',
  standalone: true,
  imports: [
    NavigationContainerComponent, 
    ButtonModule, 
    TableModule,
    CardWithSkeletonComponent
  ],
  templateUrl: './solicitudes-diseno-curso.component.html',
  styleUrl: './solicitudes-diseno-curso.component.scss'
})

export class SolicitudesDisenoCursoComponent {

  constructor (private router:Router) { }

  requestList:GetSolicitudDisenoCursoData[] = []

  redirectToSubmitRequest() {
    this.router.navigate(['/submit-solicitud-diseno-curso'])
  }

}