// Types
import { GetRole } from '../roles/types';

export type PostLogin = {
  correo: string;
  contrasena: string;
}

export type PostLoginResponse = {
  token:string;
  user:GetUser;
}

export type GetUser = {
  nombre:string;
  apellido:string;
  correo:string;
  rol:GetRole;
}