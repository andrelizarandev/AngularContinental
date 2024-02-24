// Modules
import { Store, select } from '@ngrx/store';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { injectMutation } from '@tanstack/angular-query-experimental';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, inject } from '@angular/core';

// Actions
import { setMessageFromUiDataAction } from '../../../state/actions/ui-actions';

// Messages
import { postArchivoSuccessMessage } from '../../../data/data.messages';

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

  @Input() isDialogOpen = false;
  @Output() closeDialogEmitter = new EventEmitter<void>();
  @ViewChild('fileInput') fileInput:ElementRef | null = null;

  store = inject(Store);
  produccionService = inject(ProduccionService);
  
  currentFile: File | null = null;

  // Queries
  sendProduccionGeneralFileMutation = injectMutation((client) => ({
    mutationFn: (data:PostProduccionGeneralFileData) => this.produccionService.submitProduccionGeneralFile(data),
    onSuccess: () =>  {
      client.invalidateQueries({ queryKey:['get-produccion-general' ]});
      this.closeDialog();
      this.store.dispatch(setMessageFromUiDataAction({ message:postArchivoSuccessMessage }));
    }
  }));

  // On Change
  onFileChange (event: Event) {
    const target = event.target as HTMLInputElement;
    const file = (target.files as FileList)[0];
    this.currentFile = file;
    this.fileInput!!.nativeElement.value = '';
  }

  closeDialog () {
    this.closeDialogEmitter.emit();
    this.removeFile();
  }

  removeFile = () => this.currentFile = null;

  sendFile = () => this.sendProduccionGeneralFileMutation.mutate({ file: this.currentFile!! });

}
