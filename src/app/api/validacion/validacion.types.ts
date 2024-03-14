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
  validacion:number;
}

export type GetValidacionResponse = {
  datos:GetValidacionData
}

export type GetCompletarValidacionResponse = {
  data:GetCompletarValidacionData[]
}

export type GetCompletarValidacionData = PostCompletarValidacionData;

export type PostCompletarValidacionData = {
  
  id_produccion_general:string;

  fecha_envio_validacion:string;
  porcentaje_real:number;
  carpeta_entregable:string;
  fecha_validacion:string;

  estado_avance_validacion:number;

  confirmacion_levantamiento:number;
  observacion_confirmacion_levantamiento:string;

  presenta_guia_aprendizaje:number;
  observacion_presenta_guia_aprendizaje:string;

  resultados_aprendizaje_guia_estudiante:number;
  observacion_resultados_aprendizaje_guia_estudiante:string;

  enlaces_e_hipervinculos_para_recursos:number;
  observacion_enlaces_e_hipervinculos_para_recursos:string;

  actividades_propuestas:number;
  observacion_actividades_propuestas:string;

  foro_formativo:number;
  observacion_foro_formativo:string;

  objetos_aprendizaje:number;
  observacion_objetos_aprendizaje:string;
  
  observaciones_validador:number;
  pasa_implementacion:number;
  observacion_scorm:number;

}

export type PostEmailWhenGotSomeObservationsData = {
  curso:string;
  observaciones:string;
}

export type PossibleObservationsData = {
  observacion_confirmacion_levantamiento:string;
  observacion_presenta_guia_aprendizaje:string;
  observacion_resultados_aprendizaje_guia_estudiante:string;
  observacion_enlaces_e_hipervinculos_para_recursos:string;
  observacion_actividades_propuestas:string;
  observacion_foro_formativo:string;
  observacion_objetos_aprendizaje:string;
}