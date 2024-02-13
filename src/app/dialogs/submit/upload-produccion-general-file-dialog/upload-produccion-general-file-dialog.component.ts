// Modules
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';

// Services
import { SolicitudDisenoCursoService } from '../../../api/solicitudes-diseno-curso/diseno-curso.service';

@Component({
  selector: 'app-upload-produccion-general-file-dialog',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
  ],
  templateUrl: './upload-produccion-general-file-dialog.component.html',
  styleUrl: './upload-produccion-general-file-dialog.component.scss'
})
export class UploadProduccionGeneralFileDialogComponent {

  submitProduccionGeneralFileService = inject(SolicitudDisenoCursoService).submitSolicitudDisenoCursoFile();

  @Input() isDialogOpen = false;
  @Output() closeDialogEmitter = new EventEmitter<void>();

  currentFile: File | null = null;

  onChangeFile (event: Event) {
    const target = event.target as HTMLInputElement;
    const file = (target.files as FileList)[0];
    this.currentFile = file;
  }

  removeFile = () => this.currentFile = null;

  closeDialog () {
    this.removeFile();
    this.closeDialogEmitter.emit();
  }

  async sendFile () {
    try {
      const result = await this.submitProduccionGeneralFileService.mutateAsync({ file:this.currentFile!! });
      this.closeDialog();
    } catch (err:any) {}
  }

}
