export type GetSolicitudDisenoCursoByIdResponse = {
  data: GetSolicitudDisenoCursoData | null;
}

export type GetSolicitudDisenoCursoData = { id: string; } & PostSolicitudDisenoCursoData;

export type PostSolicitudDisenoCursoData = {
  codigo: string;
  asignatura: string;
  plan: string;
  eap: string;
  tipo_asignatura: string;
  tipo_diseno: string;
  facultad: string;
  docente: string;
  modalidad: string;
  formato: string;
  presencial: string;
  semipresencial: string;
  adistancia: string;
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

export type GetPlanData = {
  id:number;
  nombre:string;
}

export type SubmitSolicitudDisenoCursoFileData = {
  file: File;
}