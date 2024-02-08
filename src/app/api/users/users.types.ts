export type PostUserData = {
  nombres:string;
  apellidos:string;
  email:string;
  password:string;
  email_personal:string;
  rol:string;
}

export type GetUserData = { id:number; } & PostUserData;

export type PostUserResponse = { data:GetUserData; };

export type GetUserResponse = GetUserData[];