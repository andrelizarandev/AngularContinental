export type PostUserData = {
  nombres:string;
  apellidos:string;
  email:string;
  password:string;
  email_personal:string;
  rol:number;
  documento_identidad:string;
}

export type GetUserData = PostUserData & { id_usuario:number; nombre_rol:string };

export type PostUserResponse = { data:GetUserData; };

export type GetUserResponse = GetUserData[];

export type GetUserByIdResponse = {
  data:GetUserData;
}

export type PutUserData = Omit<PostUserData, 'password'> & { id_usuario:number; };