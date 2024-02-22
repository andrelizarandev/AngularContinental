// Types
import { GetProduccionGeneralData } from '../produccion/produccion.types';

export type GetReportesData = { 
  id_facultad:number;
  unidades:GetPorcentajeRealData;
} & GetProduccionGeneralData;

export type GetReportesResponse = {
  resultado:GetReportesData[];
}

export type GetFacultadData = {
  id:number;
  nombre:string;
}

export type GetPorcentajeRealData = {

  unidad1: {
    autoevaluaciones:number;
    ppt:number;
    recurso_innovador:number;
    guia:number;
    pa:number;
    hoja_calendario:number;
    lecturas:number;
  }

  unidad2: {
    autoevaluaciones:number;
    ppt:number;
    recurso_innovador:number;
    guia:number;
    pa:number;
  }

  unidad3: {
    autoevaluaciones:number;
    ppt:number;
    recurso_innovador:number;
    guia:number;
    pa:number;
  }

  unidad4: {
    autoevaluaciones:number;
    ppt:number;
    recurso_innovador:number;
    guia:number;
    pa:number;
  }
  
}