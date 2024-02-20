export type GetReportesData = {

}

export type GetReportesResponse = {
  datos:GetReportesData[];
}

export type GetFacultadData = {
  id:number;
  nombre:string;
}

export type GetPorcentajeRealData = {
  evaluacion_entrada:number;
  formato:string;
  hoja_calendario:number;
  horas_asincronas:number;
  horas_sincronas:number;
  id:number;
  id_produccion_general:number;
  lecturas:number;
  u1_autoevaluaciones:number;
  u1_guia:number;
  u1_pa1:number;
  u1_ppt:number;
  u1_recurso_innovador:number;
  u2_autoevaluaciones:number;
  u2_guia:number;
  u2_pa2:number;
  u2_ppt:number;
  u2_recurso_innovador:number;
  u3_autoevaluaciones:number;
  u3_guia:number;
  u3_pa3:number;
  u3_ppt:number;
  u3_recurso_innovador:number;
  u4_autoevaluaciones:number;
  u4_guia:number;
  u4_pa4:number;
  u4_ppt:number;
  u4_recurso_innovador:number;
}