export type GetRoleData = { id:string; } & PostRoleData

export type PostRoleData = {
  nombre: string;
}

export type GetRoleResponse = {
  data:GetRoleData;
}

export type PostRoleResponse = {
  data:GetRoleData;
}

export type PutRoleData = GetRoleData;