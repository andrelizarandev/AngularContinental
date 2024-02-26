export type PostProgramaData = { nombre:string; codigo:string; }

export type GetProgramaData = { id:number; } & PostProgramaData;

export type GetProgramaResponse = GetProgramaData[];

export type PutProgramaData = GetProgramaData