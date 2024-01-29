export type PostProgramaData = { nombre:string; }

export type GetProgramaData = { id:string; } & PostProgramaData;

export type GetProgramaResponse = { data:GetProgramaData; }