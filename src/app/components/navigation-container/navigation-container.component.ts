// Modules
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-navigation-container',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './navigation-container.component.html',
  styleUrl: './navigation-container.component.scss'
})
export class NavigationContainerComponent  {

  constructor (
    private router:Router
  ) {}

  redirectTo (route:string) {
    this.router.navigate([route]);
  }

  routeList:RouteElement[] = [
    { name: "Usuarios", icon: "pi pi-users", route: "/users" },
    { name: "Programas", icon: "pi pi-users", route: "/programas" },
    { name: "Periodos", icon: "pi pi-users", route: "/periodos" },
    { name: "Roles", icon: "pi pi-users", route: "/roles" },
  ];

}

export type RouteElement = {
  name: string;
  icon: string;
  route: string;
}