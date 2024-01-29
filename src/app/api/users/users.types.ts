export type PostUserData = {
  nombres:string;
  apellidos:string;
  correoInst:string;
  correoPers:string;
  telefono:string;
  rol:string;
}

export type GetUserData = { id:number; } & PostUserData;

export type PostUserResponse = { data:GetUserData; };