export type PostMetodoData = {

  id_produccion_general:string | number;
  modalidad:string | number;
  formato:string | number;

  horas_asincronas:string | number;
  horas_sincronas:string | number;
  evaluacion_entrada:string | number;
  hoja_calendario:string | number;
  lecturas:string | number;

  u1_autoevaluaciones:string | number;
  u1_ppt:string | number;
  u1_guia:string | number;
  u1_pa1:string | number;
  u1_recurso_innovador:string | number;

  u2_autoevaluaciones:string | number;
  u2_ppt:string | number;
  u2_guia:string | number;
  u2_pa2:string | number;
  u2_recurso_innovador:string | number;

  u3_autoevaluaciones:string | number;
  u3_ppt:string | number;
  u3_guia:string | number;
  u3_pa3:string | number;
  u3_recurso_innovador:string | number;

  u4_autoevaluaciones:string | number;
  u4_ppt:string | number;
  u4_guia:string | number;
  u4_pa4:string | number;
  u4_recurso_innovador:string | number;

}

export type PostMetodoWithCalculoData = {
  calculo:number;
} & PostMetodoData;

export type GetMetodoByProduccionGeneralIdModalidadAndFormatoData = {
  id_produccion_general:string;
  modalidad:string;
  formato:string;
}

export type GetMetodoData = {
  data:PostMetodoData[];
}