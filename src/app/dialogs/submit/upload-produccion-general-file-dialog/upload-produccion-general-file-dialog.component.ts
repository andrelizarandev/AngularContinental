// Modules
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { injectMutation } from '@tanstack/angular-query-experimental';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';

// Services
import { ProduccionService } from '../../../api/produccion/produccion.service';

// Types
import { PostProduccionGeneralFileData } from '../../../api/produccion/produccion.types';

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

  produccionService = inject(ProduccionService);

  sendProduccionGeneralFileMutation = injectMutation((client) => ({
    mutationFn: (data:PostProduccionGeneralFileData) => this.produccionService.submitProduccionGeneralFile(data),
    onSuccess: () =>  {
      client.invalidateQueries({ queryKey:['get-produccion-general' ]});
      this.closeDialog();
    }
  }))

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
    this.closeDialogEmitter.emit();
  }

  sendFile () {
    const result = this.sendProduccionGeneralFileMutation.mutate({ file: this.currentFile!!, data:'Hello World' });
  }

}
