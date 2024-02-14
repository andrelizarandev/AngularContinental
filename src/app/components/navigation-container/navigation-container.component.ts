// Modules
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { Store, select } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Component, inject } from '@angular/core';

// Selectors
import { messageSelector } from '../../state/selectors/ui.selector';

// Types
import { MessageData } from '../../state/reducers/ui.reducer';

@Component({
  selector: 'app-navigation-container',
  standalone: true,
  imports: [
    ButtonModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './navigation-container.component.html',
  styleUrl: './navigation-container.component.scss'
})
export class NavigationContainerComponent  {

  store = inject(Store);
  message:MessageData | null = null;

  constructor (private router:Router, private messageService: MessageService) {
    this.store.pipe(select(messageSelector)).subscribe((message) => {
      if (message) this.messageService.add({ 
        severity:message.type,
        summary:message.message 
      });
    });
  }

  redirectTo (route:string) {
    this.router.navigate([route]);
  }

  routeList:RouteElement[] = [
    { name: "Usuarios", icon: "pi pi-users", route: "/users" },
    { name: "Programas", icon: "pi pi-book", route: "/programas" },
    { name: "Periodos", icon: "pi pi-calendar", route: "/periodos" },
    { name: "Roles", icon: "pi pi-list", route: "/roles" },
    // { name: "Diseño de Curso", icon: "pi pi-pencil", route: "/solicitud-diseno-curso" },
    { name: "Producción", icon: "pi pi-cog", route: "/produccion-general" },
  ];

}

export type RouteElement = {
  name: string;
  icon: string;
  route: string;
}