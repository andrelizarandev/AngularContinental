export type PostUserData = {
  nombres:string;
  apellidos:string;
  email:string;
  password:string;
  email_personal:string;
  rol:number;
}

export type GetUserData = { 
  id_usuario:number; 
  nombre_rol:string 
} & PostUserData;

export type PostUserResponse = { data:GetUserData; };

export type GetUserResponse = GetUserData[];