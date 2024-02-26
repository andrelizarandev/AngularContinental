// Modules
import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';

// Components
import { CardWithSkeletonComponent } from '../../../components/card-with-skeleton/card-with-skeleton.component';
import { NavigationContainerComponent } from '../../../components/navigation-container/navigation-container.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavigationContainerComponent,
    CardWithSkeletonComponent,
    ChartModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  // Vars
  barData: any;
  pieData: any;
  barOptions: any;
  pieOptions: any;

  countersList: TitleWithCounter[] = [
    { title: 'Cursos', counter: 23 },
    { title: 'Alumnos', counter: 45 },
    { title: 'Profesores', counter: 59 },
    { title: 'Instituciones', counter: 70 },
    { title: 'Carreras', counter: 94 },
    { title: 'Grupos', counter: 100 }
  ];

  documentStyle = getComputedStyle(document.documentElement);

  ngOnInit() {

    const textColor = this.documentStyle.getPropertyValue('--text-color');

    this.barData = {
      labels: ['23/02/2024', '24/02/2024', '25/02/2024', '26/02/2024', '27/02/2024'],
      datasets: [
        {
          label: 'Porcentaje Avance',
          data: [23, 45, 59, 70, 94, 100],
          backgroundColor: [
            this.documentStyle.getPropertyValue('--blue-500'), 
            this.documentStyle.getPropertyValue('--red-500'), 
            this.documentStyle.getPropertyValue('--green-500'),
            this.documentStyle.getPropertyValue('--gray-500'),
            this.documentStyle.getPropertyValue('--yellow-500'),
            this.documentStyle.getPropertyValue('--purple-500')
          ]
        }
      ]
    };

    this.pieData = {
      labels: ['Presencial', 'Semipresencial', 'A Distancia'],
      datasets: [
        {
          data: [30, 40, 30],
          backgroundColor: [
            this.documentStyle.getPropertyValue('--blue-500'), 
            this.documentStyle.getPropertyValue('--yellow-500'), 
            this.documentStyle.getPropertyValue('--green-500')
          ],
          hoverBackgroundColor: [
            this.documentStyle.getPropertyValue('--blue-400'), 
            this.documentStyle.getPropertyValue('--yellow-400'), 
            this.documentStyle.getPropertyValue('--green-400')
          ]
        }
      ]
    };

    this.pieOptions = {
      plugins: {
          legend: {
            labels: {
              usePointStyle: true,
              color: textColor
            }
          }
        }
    };

  }

}

export type TitleWithCounter = {
  title: string;
  counter: number;
}