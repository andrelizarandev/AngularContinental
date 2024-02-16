export type GetValidacionData = {
  adistancia:string;
  asignatura:string;
  ciclo:string;
  codigo:string;
  correo_instruccional:string;
  disenador_instruccional:string;
  docente_disenador:string;
  email_docente:string;
  fecha_finalizacion:string;
  fecha_inicio:string;
  id:number;
  modalidad:string;
  numero_formatos:string;
  observaciones:string;
  presencial:string;
  responsable:string;
  semipresencial:string;
  telefono_docente:string;
  telefono_instruccional:string;
  tipo_diseno:string;
}

export type GetValidacionResponse = {
  datos:GetValidacionData
}