// Modules
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

// Components
import { NavigationContainerComponent } from '../../components/navigation-container/navigation-container.component';

// Dialogs
import { RegisterPeriodoDialogComponent } from '../../dialogs/register-periodo-dialog/register-periodo-dialog.component';
import { ConfirmDialogComponent, ConfirmDialogPayload } from '../../shared-dialogs/confirm-dialog/confirm-dialog.component';

// Service
import { PeriodoService } from '../../api/periodo/periodo.service';

// Types
import { GetPeriodoData } from '../../api/periodo/periodo.types';

@Component({
  selector: 'app-periodos-screen',
  standalone: true,
  imports: [
    NavigationContainerComponent, 
    TableModule, 
    ButtonModule, 
    RegisterPeriodoDialogComponent, 
    ConfirmDialogComponent
  ],
  templateUrl: './periodos-screen.component.html',
  styleUrl: './periodos-screen.component.scss'
})
export class PeriodosScreenComponent {

  isRegisterOpen: boolean = false;

  confirmDeletePayload:ConfirmDialogPayload | null = null

  periodosList:GetPeriodoData[] = []

  constructor (private periodoService:PeriodoService) {}

  ngOnInit () {
    this.getPeriodosList();
  }

  // Get
  getPeriodosList () {
    this.periodoService.getPeriodoList().subscribe({
      next: (response) => this.onSuccessGetPeriodosList(response),
      error: () => this.onErrorGetPeriodosList()
    })
  }

  // Toggle
  toggleOpenRegister () {
    this.isRegisterOpen = !this.isRegisterOpen;
  }
  
  toggleOpenDelete () {
    this.confirmDeletePayload = {
      title: 'Eliminar periodo',
      message: `¿Estás seguro de eliminar el periodo`,
      actionLabel: 'Eliminar',
      action: () => {},
      cancelAction: () => this.confirmDeletePayload = null
    };
  }

  // On Success 
  onSuccessGetPeriodosList (response:GetPeriodoData[]) {
    this.periodosList = response;
  }

  // On Error
  onErrorGetPeriodosList () {
    console.error('Error');
  }

}
