// Modules
import { MenuItem } from 'primeng/api';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ActivatedRoute } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';


// Classes
import BreadcrumbItemsClass from '../../../utils/breadcrumb-items';

// Components
import { CustomBreadcrumbComponent } from '../../../components/custom-breadcrumb/custom-breadcrumb.component';
import { CardWithSkeletonComponent } from '../../../components/card-with-skeleton/card-with-skeleton.component';
import { NavigationContainerComponent } from '../../../components/navigation-container/navigation-container.component';

@Component({
  selector: 'app-submit-implementacion',
  standalone: true,
  imports: [
    TableModule,
    CustomBreadcrumbComponent,
    CardWithSkeletonComponent,
    NavigationContainerComponent,
  ],
  templateUrl: './submit-implementacion.component.html',
  styleUrl: './submit-implementacion.component.scss'
})

export class SubmitImplementacionComponent {

  currentId = this.activatedRoute.snapshot.params['id'];

  breadcrumbItems:MenuItem[] = [
    BreadcrumbItemsClass.homeItem,
    BreadcrumbItemsClass.produccionGeneral,
    BreadcrumbItemsClass.registroImplementacionItem('id')
  ];

  constructor (private activatedRoute:ActivatedRoute) {}

}
