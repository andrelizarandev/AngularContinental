// Modules
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { Component, EventEmitter, Input, Output } from '@angular/core';

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

  @Input() isDialogOpen = false;
  @Output() closeDialogEmitter = new EventEmitter();

  currentFile: File | null = null;

  // Toggle
  toggleIsDialogOpen() {
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
  }

  // Submit
  submitSilaboFile () {
    
  }

}
