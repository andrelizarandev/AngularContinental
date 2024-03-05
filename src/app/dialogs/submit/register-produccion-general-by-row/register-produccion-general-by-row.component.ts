// Modules
import { MenuItem } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-register-produccion-general-by-row',
  standalone: true,
  imports: [
    DialogModule, 
    ButtonModule,
    ReactiveFormsModule,
    BreadcrumbModule,
  ],
  templateUrl: './register-produccion-general-by-row.component.html',
  styleUrl: './register-produccion-general-by-row.component.scss'
})
export class RegisterProduccionGeneralByRowComponent {

  // Props
  @Input() isDialogOpen = false;
  @Output() closeDialogEmitter = new EventEmitter();

  // Vars
  currentAsignatura:null | string = null;
  currentModalidad:null | string = null;
  currentFormato:null | string = null;
  currentUnidad:null | string = null;

  // Breadcrumbs
  breadcrumbItems:MenuItem[] = [];

  // Close
  closeDialog = () => this.closeDialogEmitter.emit();

  setCurrentAsignatura (asignatura:string) {
    this.currentAsignatura = asignatura;
    const newItem = [{ label:asignatura, command:() => this.cleanTilAsignatura() }];
    this.breadcrumbItems = [...this.breadcrumbItems, ...newItem];
  }

  setCurrentModalidad (modalidad:string) {
    this.currentModalidad = modalidad;
    const newItem = [{ label:modalidad, command: () => this.cleanTilModalidad() }];
    this.breadcrumbItems = [...this.breadcrumbItems, ...newItem];
  }

  setCurrentFormato (formato:string) {
    this.currentFormato = formato;
    const newItem = [{ label:formato, command: () => this.cleanTilFormato() }];
    this.breadcrumbItems = [...this.breadcrumbItems, ...newItem];
  }

  setCurrentUnidad (unidad:string) {
    this.currentUnidad = unidad;
    const newItem = [{ label:unidad, command: () => this.cleanTilUnidad() }];
    this.breadcrumbItems = [...this.breadcrumbItems, ...newItem];
  }

  cleanTilAsignatura () {
    this.currentAsignatura = null;
    this.currentModalidad = null;
    this.currentFormato = null;
    this.currentUnidad = null;
    this.breadcrumbItems = this.breadcrumbItems.slice(0, 1);
  }

  cleanTilModalidad () {
    this.currentModalidad = null;
    this.currentFormato = null;
    this.currentUnidad = null;
    this.breadcrumbItems = this.breadcrumbItems.slice(0, 2);
  }

  cleanTilFormato () {
    this.currentFormato = null;
    this.currentUnidad = null;
    this.breadcrumbItems = this.breadcrumbItems.slice(0, 3);
  }

  cleanTilUnidad () {
    this.currentUnidad = null;
    this.breadcrumbItems = this.breadcrumbItems.slice(0, 4);
  }

}
