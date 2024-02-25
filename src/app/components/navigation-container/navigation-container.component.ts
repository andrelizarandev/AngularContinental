// Modules
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

// Actions
import { setShowSidebarAction } from '../../state/actions/ui-actions';

// Components
import { ContextContainerComponent } from '../context-container/context-container.component';

// Selectors
import { showSidebarSelector } from '../../state/selectors/ui.selector';

// Types
import { MessageData } from '../../state/reducers/ui.reducer';

@Component({
  selector: 'app-navigation-container',
  standalone: true,
  imports: [
    ButtonModule,
    CommonModule,
    ContextContainerComponent
  ],
  providers: [MessageService],
  templateUrl: './navigation-container.component.html',
  styleUrl: './navigation-container.component.scss'
})
export class NavigationContainerComponent  {

  store = inject(Store);

  message:MessageData | null = null;

  shouldShowSidebar:boolean = true;

  constructor (private router:Router) {

    this.store.pipe(select(showSidebarSelector)).subscribe((showSidebar) => {
      this.shouldShowSidebar = showSidebar;
    });

  }

  redirectTo (route:string) {
    this.router.navigate([route]);
  }

  toggleSidebar () {
    this.store.dispatch(setShowSidebarAction({ showSidebar: !this.shouldShowSidebar }));
  }

  routeList:RouteElement[] = [
    { name: "Inicio", icon: "pi pi-home", route: "/" },
    { name: "Usuarios", icon: "pi pi-users", route: "/users" },
    { name: "Programas", icon: "pi pi-book", route: "/programas" },
    { name: "Periodos", icon: "pi pi-calendar", route: "/periodos" },
    { name: "Roles", icon: "pi pi-list", route: "/roles" },
    { name: "Producción", icon: "pi pi-cog", route: "/produccion-general" },
  ];

}

export type RouteElement = {
  name: string;
  icon: string;
  route: string;
}