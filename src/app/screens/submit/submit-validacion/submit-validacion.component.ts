// Modules
import { MenuItem } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute } from '@angular/router';
import { Component, inject } from '@angular/core';
import { injectMutation, injectQuery } from '@tanstack/angular-query-experimental';

// Classes
import BreadcrumbItemsClass from '../../../utils/breadcrumb-items';

// Actions
import { setConfirmDialogPayloadAction, setMessageFromUiDataAction } from '../../../state/actions/ui-actions';

// Components
import { CustomBreadcrumbComponent } from '../../../components/custom-breadcrumb/custom-breadcrumb.component';
import { CardWithSkeletonComponent } from '../../../components/card-with-skeleton/card-with-skeleton.component';
import { NavigationContainerComponent } from '../../../components/navigation-container/navigation-container.component';
import { RegisterValidacionDialogComponent } from '../../../dialogs/submit/register-validacion-dialog/register-validacion-dialog.component';

// Messages
import { alreadyConfirmedMessage, putValidacionSuccessMessage } from '../../../data/data.messages';

// Services
import { ValidacionService } from '../../../api/validacion/validacion.service';
import { ModalidadesService } from '../../../api/modalidades/modalidades.service';

// Types
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-submit-validacion',
  standalone: true,
  imports: [
    CustomBreadcrumbComponent,
    CardWithSkeletonComponent,
    NavigationContainerComponent,
    TableModule,
    ButtonModule,
    RegisterValidacionDialogComponent
  ],
  templateUrl: './submit-validacion.component.html',
  styleUrl: './submit-validacion.component.scss'
})
export class SubmitValidacionComponent {

  // Injects
  validationService = inject(ValidacionService);
  modalidadService = inject(ModalidadesService);

  // Vars
  isValidated = false;
  isSubmitValidationDialogOpen = false;
  currentId = this.activatedRoute.snapshot.params['id'];

  // Breadcrumbs
  breadcrumbItems:MenuItem[] = [
    BreadcrumbItemsClass.homeItem,
    BreadcrumbItemsClass.produccionGeneral,
    { ...BreadcrumbItemsClass.validacionItem(this.currentId)}
  ]

  constructor (private activatedRoute: ActivatedRoute, private store:Store) {}

  // Queries
  validationQuery = injectQuery(() => ({
    queryKey: ['get-validation'],
    queryFn: async () => {
      const result = await this.validationService.getValidacionByProduccionGeneralId(this.currentId);
      return [result.datos];
    }
  }));

  getModalidadesQuery = injectQuery(() => ({
    queryKey: ['get-modalidades'],
    queryFn: async () => {
      const result = await this.modalidadService.getModalidadesApi();
      return result.modalidades;
    }
  }));

  putValidacionMutation = injectMutation(() => ({
    mutationFn: (id:number) => this.validationService.putValidacionApi(id),
    onSuccess: () => {
      this.store.dispatch(setMessageFromUiDataAction({ message:putValidacionSuccessMessage }));
      this.isValidated = true;
      this.store.dispatch(setConfirmDialogPayloadAction({ confirmDialogPayload:null }));
    }
  }))

  // Match
  matchModalidadById (id:string) {
    const modalidadesData = this.getModalidadesQuery.data();
    if (!modalidadesData) return 'No Especificado';
    return modalidadesData.find((modalidad) => String(modalidad.id) === id)?.nombre || 'No Especificado';
  }

  // Get
  getCurrentFormato (idPresencial:string, idSemipresencial:string, idAdistancia:string) {
    if (idPresencial) return 'Presencial';
    else if (idSemipresencial) return 'Semipresencial';
    else if (idAdistancia) return 'A Distancia';
    else return 'No Especificado';
  }

  // Confirm
  confirmValidacion () {
    this.store.dispatch(setConfirmDialogPayloadAction({ confirmDialogPayload: {
      title:'Confirmar Validación',
      message:'¿Estás seguro de que deseas validar esta producción?',
      action:() => this.putValidacionMutation.mutate(this.currentId),
      actionLabel:'Confirmar',
      cancelAction: () => this.store.dispatch(setConfirmDialogPayloadAction({ confirmDialogPayload:null })),
    }}));
  }

  // Get
  getIsTableConfirmed () {
    const result =  this.validationQuery.data()
    if (!result) return 0;
    return result[0].validacion
  }

  // Show
  showAlreadyConfirmedMessage () {
    this.store.dispatch(setMessageFromUiDataAction({ message:alreadyConfirmedMessage }));
  }

  toggleIsSubmitValidationDialogOpen () {
    this.isSubmitValidationDialogOpen = !this.isSubmitValidationDialogOpen;
  }

}
