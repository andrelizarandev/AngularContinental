export type GetImplementacionByIdData = {
  codigo:string;
  asignatura:string;
  ciclo:string;
  modalidad:string;
  tipo_diseno:string;
  presencial:string;
  semipresencial:string;
  adistancia:string;
  numero_formatos:string;
  id_produccion_general:number;
  carpeta_entregable:string;
  fecha_validacion:string;
  silabos:SilaboData[];
}

export type SilaboData = {
  id:number;
  id_produccion_general:number;
  created_at:string;
  ruta_archivo:string;
}