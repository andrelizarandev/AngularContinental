// Modules
import { MenuItem } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { Component, ElementRef, ViewChild, inject } from '@angular/core';


// Components
import { CardWithSkeletonComponent } from '../../../components/card-with-skeleton/card-with-skeleton.component';
import { NavigationContainerComponent } from '../../../components/navigation-container/navigation-container.component';

// Services
import { ProduccionService } from '../../../api/produccion/produccion.service';

@Component({
  selector: 'app-submit-produccion-general-archivos-screen',
  standalone: true,
  imports: [
    NavigationContainerComponent,
    CardWithSkeletonComponent,
    DialogModule, 
    ButtonModule,
    ReactiveFormsModule,
    BreadcrumbModule,
    MessageModule,
    FileUploadModule
  ],
  templateUrl: './submit-produccion-general-archivos-screen.component.html',
  styleUrl: './submit-produccion-general-archivos-screen.component.scss'
})
export class SubmitProduccionGeneralArchivosScreenComponent {

  // Inject
  produccionGeneralService = inject(ProduccionService);

  @ViewChild('fileInput') fileInput:ElementRef | null = null;

  currentId = this.activatedRow.snapshot.params['id'];

  // Vars
  currentAsignatura:null | string = null;
  currentModalidad:null | string = null;
  currentFormato:null | string = null;
  currentUnidad:null | string = null;
  currentFiles: File[] = [];

  // Options
  asignaturaOptions:string[] = [];

  modalidadOptions:string[] = [];

  formatoOptions:string[] = [
    'Formato Semipresencial',
    'Formato a Distancia',
    'Formato Presencial',
  ];

  unidadOptions:string[] = [
    'Unidad 1',
    'Unidad 2',
    'Unidad 3',
    'Unidad 4'
  ];
  
  // Breadcrumbs
  breadcrumbItems:MenuItem[] = [];

  constructor (private activatedRow:ActivatedRoute) {}

  getProductionGeneralByIdQuery = injectQuery(() => ({

    queryKey:['get-produccion-general'],

    queryFn: async () => {

      try {

        const result = await this.produccionGeneralService.getProduccionGeneralById(this.currentId);

        const finalResult = result.datos_produccion_general;

        if (!finalResult) return null;

        const { 
          asignatura, 
          modalidad, 
          nombre_formato_adistancia, 
          nombre_formato_presencial, 
          nombre_formato_semipresencial,
          unidad1,
          unidad2,
          unidad3,
          unidad4,
        } = finalResult;

        this.asignaturaOptions = [asignatura]
        this.modalidadOptions = [modalidad]

        return finalResult;
        
      } catch (error) {

        return null;

      }

    }

  }));

  // Set
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

  // Clean
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

  clearCurrentFile () {
    this.currentFiles = [];
  }

  // On Change
  onFileChange (event: Event) {
    const target = event.target as HTMLInputElement;
    const files = (target.files as FileList).length > 0 ? Array.from(target.files as FileList) : [];
    this.currentFiles = files;
    this.fileInput!!.nativeElement.value = '';
  }

}
