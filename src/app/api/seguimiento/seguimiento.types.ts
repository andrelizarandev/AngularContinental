// Types
import { DataForCalculatePorcentajeAvance } from '../../helpers/calculate-porcentaje-avance-helper';

export type GetSeguimientoData = {
  id:number;
  codigo:string;
  asignatura:string;
  ciclo:string;
  docente_disenador:string;
  email_docente:string; 
  telefono_docente:string;
  disenador_instruccional:string;
  correo_instruccional:string;
  telefono_instruccional:string;
  responsable:string;
  fecha_inicio:string;
  fecha_finalizacion:string;
  fecha_presentacion_di:string
  observaciones:string;
  metodos_data:DataForCalculatePorcentajeAvance;
}

export type GetSeguimientoResponse = {
  data: GetSeguimientoData[];
}
