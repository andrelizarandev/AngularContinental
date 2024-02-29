export default class CalculatePorcentajeAvanceHelper {

  public static calculatePorcentajeAvance (selectedRow:DataForCalculatePorcentajeAvance) {

    const { 
      evaluacion_entrada,
      hoja_calendario,
      lecturas,
      u1_autoevaluacion,
      u1_guia,
      u1_pa1,
      u1_ppt,
      u1_recurso_innovador,
   } = selectedRow;
  
    const sum = (u1_autoevaluacion + u1_guia + evaluacion_entrada + hoja_calendario + lecturas + u1_pa1 + u1_ppt + u1_recurso_innovador);  
    const porcentajeReal = (sum * 25 / 8);
  
    const {
      u2_autoevaluacion,
      u2_guia,
      u2_pa2,
      u2_ppt,
      u2_recurso_innovador
    } = selectedRow;
  
    const sum2 = (u2_autoevaluacion + u2_guia + u2_pa2 + u2_ppt + u2_recurso_innovador);
    const porcentajeReal2 = (sum2 * 25 / 5);
  
    const {
      u3_autoevaluacion,
      u3_guia,
      u3_pa3,
      u3_ppt,
      u3_recurso_innovador
    } = selectedRow;
  
    const sum3 = (u3_autoevaluacion + u3_guia + u3_pa3 + u3_ppt + u3_recurso_innovador);
    const porcentajeReal3 = (sum3 * 25 / 5);
  
    const {
      u4_autoevaluaciones,
      u4_guia,
      u4_pa4,
      u4_ppt,
      u4_recurso_innovador
    } = selectedRow;
    
    const sum4 = (u4_autoevaluaciones + u4_guia + u4_pa4 + u4_ppt + u4_recurso_innovador);
    const porcentajeReal4 = (sum4 * 25 / 5);
  
    return (porcentajeReal + porcentajeReal2 + porcentajeReal3 + porcentajeReal4);
  
  }
  
}

export type DataForCalculatePorcentajeAvance = {

  evaluacion_entrada:number;
  hoja_calendario:number;
  lecturas:number;

  u1_autoevaluacion:number;
  u1_ppt:number;
  u1_guia:number;
  u1_pa1:number;
  u1_recurso_innovador:number;

  u2_autoevaluacion:number;
  u2_ppt:number;
  u2_guia:number;
  u2_pa2:number;
  u2_recurso_innovador:number;

  u3_autoevaluacion:number;
  u3_ppt:number;
  u3_guia:number;
  u3_pa3:number;
  u3_recurso_innovador:number;

  u4_autoevaluaciones:number;
  u4_ppt:number;
  u4_guia:number;
  u4_pa4:number;
  u4_recurso_innovador:number;

}