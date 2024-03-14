// Modules
import { MenuItem } from 'primeng/api';

export default class BreadcrumbItemsClass {

  static homeItem:MenuItem = { label:'Inicio', routerLink: '/home' };

  static produccionGeneral:MenuItem = { label:'Producción General', routerLink: '/produccion-general' };

  static rolesItem:MenuItem = { label:'Roles', routerLink: '/roles' };

  static periodosItem:MenuItem = { label:'Periodos', routerLink: '/periodos' };

  static programasItem:MenuItem = { label:'Programas', routerLink: '/programas' };

  static usersItem:MenuItem = { label:'Usuarios', routerLink: '/users' };

  static seguimientoItem (id:string):MenuItem {
    return { label:'Seguimiento', routerLink:`/seguimiento/${id}` };
  }

  static validacionItem (id:string):MenuItem {
    return { label:'Validación', routerLink:`/validacion/${id}` };
  }

  static registroProduccionGeneralItem (id:string):MenuItem {
    return { label:'Registro de Producción General', routerLink:`/submit-produccion-general/${id}` };
  }

  static registroReportesItem (id:string):MenuItem {
    return { label:'Registro de Reportes', routerLink:`/submit-reportes/${id}` };
  }

  static registroProduccionGeneralArchivosItem (id:string):MenuItem {
    return { label:'Registro de Producción General por Archivos', routerLink:`/submit-produccion-general-archivos/${id}` };
  }

  static registroImplementacionItem (id:string):MenuItem {
    return { label:'Registro de Implementación', routerLink:`/submit-implementacion/${id}` };
  }

}