export type PostLogin = {
  correo: string;
  contrasena: string;
}

export type PostLoginResponse = {
  token:string;
  user:GetUser;
}

export type GetUser = {
  id:string;
  nombre:string;
  apellido:string;
  correo:string;
}