// Modules
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Component, inject } from '@angular/core';

// Components
import { CardWithSkeletonComponent } from '../../../components/card-with-skeleton/card-with-skeleton.component';
import { NavigationContainerComponent } from '../../../components/navigation-container/navigation-container.component';

// Services
import { SolicitudDisenoCursoService } from '../../../api/solicitudes-diseno-curso/diseno-curso.service';

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

  requestList:GetSolicitudDisenoCursoData[] = []

  getSolicitudesDisenoCursoService = inject(SolicitudDisenoCursoService).getDisenoCursoList().result
  
  constructor (private router:Router) { }

  redirectToSubmitRequest() {
    this.router.navigate(['/submit-solicitud-diseno-curso'])
  }

  onFileSelected (event:any) {
    console.log(event)
  }

}