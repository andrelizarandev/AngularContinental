// Modules
import { Store } from '@ngrx/store';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { injectMutation } from '@tanstack/angular-query-experimental';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, inject } from '@angular/core';

// Actions
import { setMessageFromUiDataAction } from '../../../state/actions/ui-actions';

// Services
import { ProduccionService } from '../../../api/produccion/produccion.service';

// Types
import { PostSilaboFileData } from '../../../api/produccion/produccion.types';

@Component({
  selector: 'app-upload-silabo-dialog',
  standalone: true,
  imports: [
    DialogModule,
    ButtonModule,
    CommonModule,
    InputTextModule
  ],
  templateUrl: './upload-silabo.component.html',
  styleUrl: './upload-silabo.component.scss'
})
export class UploadSilaboDialogComponent {

  @ViewChild('fileInput') fileInput:ElementRef | null = null;

  produccionService = inject(ProduccionService);

  // Props
  @Input() isDialogOpen = false;
  @Output() closeDialogEmitter = new EventEmitter();

  constructor (
    private activeRoute:ActivatedRoute,
    private store:Store
  ) {}

  submitSilaboFileMutation = injectMutation((client) => ({
    mutationFn: (data:PostSilaboFileData) => this.produccionService.submitSilaboFile(data),
    onSuccess: () => {
      this.closeDialog();
      this.store.dispatch(setMessageFromUiDataAction({ message:{ message:'Archivo Enviado', type:'success' } }))
      client.invalidateQueries({ queryKey:['get-silabos-in-this-periodo-general'] });
    }
  }));

  // Properties
  currentFile: File | null = null;

  // Toggle
  closeDialog() {
    this.closeDialogEmitter.emit();
    this.cleanFile();
  }

  // Clean
  cleanFile() {
    this.currentFile = null;
  }

  // On Change
  onFileChange(event:Event) {
    const target = event.target as HTMLInputElement;
    const file = (target.files as FileList)[0];
    this.currentFile = file;
    this.fileInput!!.nativeElement.value = '';
  }

  // Submit
  submitSilaboFile () {
    const payload:PostSilaboFileData = {
      file: this.currentFile!!,
      id_produccion_general: this.activeRoute.snapshot.params['id']
    }
    this.submitSilaboFileMutation.mutate(payload);
  }

}
