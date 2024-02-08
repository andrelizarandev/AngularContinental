// Modules
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

// Components
import { NavigationContainerComponent } from '../../components/navigation-container/navigation-container.component';

// Dialogs
import { RegisterProgramaComponentDialog } from '../../dialogs/register-programa-dialog/register-programa.component-dialog';

// Service
import { ProgramasService } from '../../api/programas/programas.service';

// Types
import { GetProgramaData } from '../../api/programas/programas.types';
import { ConfirmDialogComponent, ConfirmDialogPayload } from '../../shared-dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-programas-screen',
  standalone: true,
  imports: [
    ButtonModule, 
    TableModule, 
    NavigationContainerComponent, 
    RegisterProgramaComponentDialog, 
    ConfirmDialogComponent
  ],
  templateUrl: './programas-screen.component.html',
  styleUrl: './programas-screen.component.scss'
})

export class ProgramasScreenComponent {

  isRegisterOpen = false;

  confirmDeletePayload:ConfirmDialogPayload | null = null;

  constructor (
    private programasService:ProgramasService
  ) {}

  ngOnInit () {
    console.log('ProgramasScreenComponent');
    this.getProgramasList();
  }

  programasList:GetProgramaData[] = [];

  // Get
  getProgramasList () {
    this.programasService.getProgramasList().subscribe({
      next: (response) => this.onSuccessGetProgramasList(response),
      error: (error) => console.error(error)
    });
  }

  // Toggle
  toggleOpenRegister () {
    this.isRegisterOpen = !this.isRegisterOpen;
  }

  toggleOpenDelete () {
    this.confirmDeletePayload = {
      title: 'Eliminar programa',
      message: `¿Estás seguro de eliminar el programa`,
      actionLabel: 'Eliminar',
      action: () => {},
      cancelAction: () => this.confirmDeletePayload = null
    };
  }

  // On Submit
  onSubmitPrograma () {
    // this.programasService.postPrograma({ nombre:'' }).subscribe({
    //   next:(response) => this.onSuccessSubmitPrograma(response.data),
    //   error:() => this.onErrorSubmitPrograma()
    // });
  }

  // On Success
  onSuccessGetProgramasList (response:GetProgramaData[]) {
    console.log(response);
    this.programasList = response;
  }

  onSuccessSubmitPrograma (response:GetProgramaData) {}

  // On Error
  onErrorSubmitPrograma () {}

}
