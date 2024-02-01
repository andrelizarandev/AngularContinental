// Modules
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-navigation-container',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './navigation-container.component.html',
  styleUrl: './navigation-container.component.scss'
})
export class NavigationContainerComponent  {

  constructor (private router:Router) {}

  redirectTo (route:string) {
    this.router.navigate([route]);
  }

  routeList:RouteElement[] = [
    { name: "Usuarios", icon: "pi pi-users", route: "/users" },
    { name: "Programas", icon: "pi pi-book", route: "/programas" },
    { name: "Periodos", icon: "pi pi-calendar", route: "/periodos" },
    { name: "Roles", icon: "pi pi-list", route: "/roles" },
    { name: "Diseño de Curso", icon: "pi pi-pencil", route: "/solicitud-diseno-curso" },
    { name: "Producción", icon: "pi pi-cog", route: "/produccion" },
  ];

}

export type RouteElement = {
  name: string;
  icon: string;
  route: string;
}