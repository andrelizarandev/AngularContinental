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

export type PostCompletarValidacionData = {
  fecha_envio_validacion:string;
  porcentaje_real:string;
  carpeta_entregable:string;
  fecha_validacion:string;
  estado_avance_validacion:string;
  confirmacion_levantamiento_observaciones:string;
  presenta_guia_aprendizaje:string;
  resultados_aprendizaje_guia_estudiante:string;
  enlaces_e_hipervinculos_para_recursos:string;
  actividades_propuestas:string;
  foro_formativo:string;
  objetos_aprendizaje:string;
  observaciones_validador:string;
  pasa_implementacion:string;
  observacion_scorm:string;
}