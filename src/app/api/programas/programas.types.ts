export type PostProgramaData = { nombre:string; codigo:string; }

export type GetProgramaData = { id:string; } & PostProgramaData;

export type GetProgramaResponse = GetProgramaData[]