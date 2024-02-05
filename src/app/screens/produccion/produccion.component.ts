// Modules
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

// Components
import { NavigationContainerComponent } from '../../components/navigation-container/navigation-container.component';

@Component({
  selector: 'app-produccion',
  standalone: true,
  imports: [NavigationContainerComponent, ButtonModule, TableModule],
  templateUrl: './produccion.component.html',
  styleUrl: './produccion.component.scss'
})
export class ProduccionComponent {

  constructor(private router: Router) {}

  productionList = [
    dummyElement,
    dummyElement,
    dummyElement,
  ];

  public redirectToProductionForm() {
    this.router.navigate(['/submit-produccion-general']);
  }

}

export type ProductionData = {
  plan:string;
  eap:string;
  tipo_asignatura:string;
  facultad:string;
  modalidad:string;
  formato_p:string;
  formato_sp:string;
  formato_d:string;
  tipo_diseno:string;
  ciclo:string;
  duracion_semanas:string;
}

const dummyElement:ProductionData = {
  plan:'Plan 1',
  eap:'EAP 1',
  tipo_asignatura:'Tipo Asignatura 1',
  facultad:'Facultad 1',
  modalidad:'Modalidad 1',
  formato_p:'Formato P 1',
  formato_sp:'Formato SP 1',
  formato_d:'Formato D 1',
  tipo_diseno:'Tipo Diseño 1',
  ciclo:'Ciclo 1',
  duracion_semanas:'Duración Semanas 1'
}