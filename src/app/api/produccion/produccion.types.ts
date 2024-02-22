export type GetProduccionGeneralData = {
  asesor: string;
  adistancia: string;
  asignatura: string;
  autor: number;
  carpeta_entregable: string;
  ciclo: string;
  codigo: string;
  colaborativo: string;
  contiverso: string;
  correo_asesor: string;
  correo_decano: string;
  correo_finalizacion: string;
  correo_instruccional: string;
  decano: string;
  designacion: string;
  dias_extra: string;
  disenador_instruccional: string;
  docente_disenador: string;
  eap: string;
  email_docente: string;
  facultad: string;
  fecha_finalizacion: string;
  fecha_inicio: string;
  fecha_presentacion_di: string;
  fecha_programada: string;
  id: number;
  modalidad: string;
  nombre_formato_adistancia: ModalidadEnum | null;
  nombre_formato_presencial: ModalidadEnum | null;
  nombre_formato_semipresencial: ModalidadEnum | null;
  nombre_modalidad: ModalidadEnum;
  numero_formatos: string;
  observacion_designacion: string;
  observaciones: string;
  plan: string;
  presencial: string;
  procedencia: string;
  realidad_aumentada: string;
  responsable: string;
  semipresencial: string;
  simulador: string;
  situacion_asignatura: string;
  solicitud_id: number;
  telefono_asesor: string;
  telefono_docente: string;
  telefono_instruccional: string;
  tiempo_programado: string;
  tipo_asignatura: string;
  tipo_diseno: string;
  unidad1: string;
  unidad2: string;
  unidad3: string;
  unidad4: string;
  video_presentacion: string;
}

export enum ModalidadEnum {
  Presencial = 'Presencial',
  Semipresencial = 'Semipresencial',
  ADistancia = 'ADistancia'
}

export type GetProduccionGeneralDataById = {
  datos_produccion_general:GetProduccionGeneralData | null;
}

export type PostProduccionGeneralFileData = {
  file:File;
}

export type PutProduccionGeneralData = Omit<GetProduccionGeneralData, 'id'>;

export type PostSilaboFileData = {
  file:File;
  id_produccion_general:number;
}

export type GetDataSilabosData = {
  id:string;
  id_produccion_general:string;
  ruta_archivo:string;
  created_at:string;
}

export type GetSilabosFromProduccionGeneralResponse = {
  archivos:GetDataSilabosData[];
}