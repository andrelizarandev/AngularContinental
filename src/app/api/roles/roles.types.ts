export type GetRoleData = { id: string; } & PostRoleData

export type PostRoleData = {
  name: string;
  description: string;
}

export type GetRoleResponse = {
  data:GetRoleData;
}

export type PostRoleResponse = {
  data:GetRoleData;
}