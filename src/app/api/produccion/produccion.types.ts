export type GetProduccionGeneralData = {
  adistancia:string
  asesor:string
  autor:string
  carpeta_entregable:string
  codigo:string; 
  colaborativo:string; 
  contiverso:string; 
  correo_asesor:string; 
  correo_decano:string; 
  correo_finalizacion:string; 
  created_at:string; 
  decano:string; 
  designacion:string;
  dias_extra:string;
  docente_disenador:string;
  eap:string;
  email_docente:string;
  fecha_finalizacion:string;
  fecha_inicio:string;
  fecha_presentacion_di:string;
  fecha_programada:string;
  id:number;
  modalidad:string;
  numero_formatos:string;
  observaciones:string;
  plan:string;
  presencial:string;
  procedencia:string;
  realidad_aumentada:string;
  responsable:string;
  semipresencial:string;
  simulador:string;
  situacion_asignatura:string;
  solicitud_id:string;
  telefono_asesor:string;
  telefono_docente:string;
  tiempo_programado:string;
  tipo_asignatura:string;
  unidad1:string;
  unidad2:string;
  unidad3:string;
  unidad4:string;
  updated_at:string;
  video_presentacion:string;
}

export type GetProduccionGeneralDataById = {
  data:GetProduccionGeneralData | null;
}

export type PostProduccionGeneralFileData = {
  file:File;
  data:string;
}