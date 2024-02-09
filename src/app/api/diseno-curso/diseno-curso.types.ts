export type GetDisenoCursoData = { id: string; } & PostDisenoCursoData;

export type PostDisenoCursoData = {
  codigo: string;
  asignatura: string;
  eap: string;
  plan: string;
  tipo_asignatura: string;
  tipo_diseno: string;
  facultad: string;
  ciclo: string;
  docente_disenador: string;
  modalidad: string;
  formato: string;
}

export type PostDisenoCursoResponse = {
  data: GetDisenoCursoData;
}

export type GetEapData = {
  id:number;
  nombre:string;
}

export type GetTipoAsignaturaData = {
  id:number;
  nombre:string;
}

export type GetTipoDisenoData = {
  id:number;
  nombre:string;
}

export type GetFacultadData = {
  id:number;
  nombre:string;
}