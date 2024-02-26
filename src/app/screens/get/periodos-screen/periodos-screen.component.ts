// Modules
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Component, inject } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';

// Actions
import { setConfirmDialogPayloadAction } from '../../../state/actions/ui-actions';

// Classes
import BreadcrumbItemsClass from '../../../utils/breadcrumb-items';

// Components
import { CustomBreadcrumbComponent } from '../../../components/custom-breadcrumb/custom-breadcrumb.component';
import { CardWithSkeletonComponent } from '../../../components/card-with-skeleton/card-with-skeleton.component';
import { NavigationContainerComponent } from '../../../components/navigation-container/navigation-container.component';

// Dialogs
import { ConfirmDialogComponent } from '../../../dialogs/shared/confirm-dialog/confirm-dialog.component';
import { RegisterPeriodoDialogComponent } from '../../../dialogs/submit/register-periodo-dialog/register-periodo-dialog.component';

// Services
import { PeriodoService } from '../../../api/periodo/periodo.service';

// Types
import { GetPeriodoData } from '../../../api/periodo/periodo.types';

@Component({
  selector: 'app-periodos-screen',
  standalone: true,
  imports: [
    NavigationContainerComponent, 
    TableModule, 
    ButtonModule, 
    RegisterPeriodoDialogComponent, 
    ConfirmDialogComponent,
    CardWithSkeletonComponent,
    CustomBreadcrumbComponent
  ],
  templateUrl: './periodos-screen.component.html',
  styleUrl: './periodos-screen.component.scss'
})
export class PeriodosScreenComponent {

  // Vars
  isPostRequest = true;
  isRegisterOpen = false;

  // Services
  periodosService = inject(PeriodoService);

  // Breadcrumb
  breadcrumbItems:MenuItem[] = [
    BreadcrumbItemsClass.homeItem,
    BreadcrumbItemsClass.periodosItem
  ];

  constructor (private store:Store) {}

  getPeriodoQuery = injectQuery(() => ({
    queryKey: ['get-periodos'],
    queryFn: () => this.periodosService.getPeriodosApi()
  }));

  // Confirm
  confirmDeletePeriodo (data:GetPeriodoData) {
    this.store.dispatch(setConfirmDialogPayloadAction({ confirmDialogPayload: {
      title: 'Eliminar periodo',
      message: `¿Estás seguro de que quieres eliminar el periodo ${data.nombre}?`,
      actionLabel: 'Eliminar',
      action: () => {},
      cancelAction: () => this.store.dispatch(setConfirmDialogPayloadAction({ confirmDialogPayload: null }))
    }}));
  }

  // Toggle
  toggleOpenRegister (isPostRequest:boolean) {
    this.isPostRequest = isPostRequest;
    this.isRegisterOpen = !this.isRegisterOpen;
  }

}
