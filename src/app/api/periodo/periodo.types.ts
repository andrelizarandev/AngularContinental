export type GetPeriodoData = { id:string; } & PostPeriodoData;

export type PostPeriodoData = { nombre:string; }

export type PutPeriodoData = GetPeriodoData;

export type GetPeriodoResponse = GetPeriodoData[];