export type PostLoginData = {
  email: string;
  password: string;
}

export type PostLoginResponse = {
  accessToken:string;
  user:GetUser;
}

export type GetUser = {
  apellidos:string;
  nombres:string;
  email:string;
  id:string;
  rol:number;
}