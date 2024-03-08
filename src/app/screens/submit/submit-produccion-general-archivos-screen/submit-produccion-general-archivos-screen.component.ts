// Modules
import { MenuItem } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { Component, ElementRef, ViewChild, inject } from '@angular/core';

// Components
import { CustomBreadcrumbComponent } from '../../../components/custom-breadcrumb/custom-breadcrumb.component';
import { CardWithSkeletonComponent } from '../../../components/card-with-skeleton/card-with-skeleton.component';
import { NavigationContainerComponent } from '../../../components/navigation-container/navigation-container.component';

// Classes
import BreadcrumbItemsClass from '../../../utils/breadcrumb-items';

// Services
import { ProduccionService } from '../../../api/produccion/produccion.service';
import { ModalidadesService } from '../../../api/modalidades/modalidades.service';

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
    FileUploadModule,
    CustomBreadcrumbComponent
  ],
  templateUrl: './submit-produccion-general-archivos-screen.component.html',
  styleUrl: './submit-produccion-general-archivos-screen.component.scss'
})
export class SubmitProduccionGeneralArchivosScreenComponent {

  // Props
  @ViewChild('fileInput') fileInput:ElementRef | null = null;

  // Inject
  modalidadesService = inject(ModalidadesService);
  produccionGeneralService = inject(ProduccionService);

  // Vars
  currentAsignatura:null | string = null;
  currentModalidad:null | string = null;
  currentFormato:null | string = null;
  currentUnidad:null | string = null;
  currentFiles: File[] = [];
  currentId = this.activatedRow.snapshot.params['id'];

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
  breadcrumbItems:MenuItem[] = [
    BreadcrumbItemsClass.homeItem,
    BreadcrumbItemsClass.produccionGeneral,
    BreadcrumbItemsClass.registroProduccionGeneralArchivosItem(this.currentId),
  ];

  selectedBreadcrumbItem:MenuItem[] = [];

  constructor (
    private activatedRow:ActivatedRoute,
    private router:Router
  ) {}

  // Queries
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
        } = finalResult;

        this.asignaturaOptions = [asignatura];

        this.getModalidadesQuery.refetch();

        return finalResult;
        
      } catch (error) {

        return null;

      }

    }

  }));

  getModalidadesQuery = injectQuery(() => ({

    queryKey:['get-modalidades'],

    queryFn: async () => {

      try {

        const result = await this.modalidadesService.getModalidadesApi();

        const productionGeneralResult = this.getProductionGeneralByIdQuery.data();

        if (productionGeneralResult) {

          const modalidadResult = result.modalidades.find((row) => row.id === Number(productionGeneralResult.modalidad));

          if (modalidadResult) this.modalidadOptions = [modalidadResult.nombre]

        }

        return result.modalidades
        
      } catch (error) {

        return null;

      }

    },

    enabled:false

  }));

  // Set
  setCurrentAsignatura (asignatura:string) {
    this.currentAsignatura = asignatura;
    const newItem = [{ label:asignatura, command:() => this.cleanTilAsignatura() }];
    this.selectedBreadcrumbItem = [...this.selectedBreadcrumbItem, ...newItem];
  }

  setCurrentModalidad (modalidad:string) {
    this.currentModalidad = modalidad;
    const newItem = [{ label:modalidad, command: () => this.cleanTilModalidad() }];
    this.selectedBreadcrumbItem = [...this.selectedBreadcrumbItem, ...newItem];
  }

  setCurrentFormato (formato:string) {
    this.currentFormato = formato;
    const newItem = [{ label:formato, command: () => this.cleanTilFormato() }];
    this.selectedBreadcrumbItem = [...this.selectedBreadcrumbItem, ...newItem];
  }

  setCurrentUnidad (unidad:string) {
    this.currentUnidad = unidad;
    const newItem = [{ label:unidad, command: () => this.cleanTilUnidad() }];
    this.selectedBreadcrumbItem = [...this.selectedBreadcrumbItem, ...newItem];
  }

  // Clean
  cleanTilAsignatura () {
    this.currentAsignatura = null;
    this.currentModalidad = null;
    this.currentFormato = null;
    this.currentUnidad = null;
    this.selectedBreadcrumbItem = this.selectedBreadcrumbItem.slice(0, 1);
  }

  cleanTilModalidad () {
    this.currentModalidad = null;
    this.currentFormato = null;
    this.currentUnidad = null;
    this.selectedBreadcrumbItem = this.selectedBreadcrumbItem.slice(0, 2);
  }

  cleanTilFormato () {
    this.currentFormato = null;
    this.currentUnidad = null;
    this.selectedBreadcrumbItem = this.selectedBreadcrumbItem.slice(0, 3);
  }

  cleanTilUnidad () {
    this.currentUnidad = null;
    this.selectedBreadcrumbItem = this.selectedBreadcrumbItem.slice(0, 4);
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

  // Redirect
  redirectToProduccionGeneral () {
    this.router.navigate(['/produccion-general']);
  }

}
