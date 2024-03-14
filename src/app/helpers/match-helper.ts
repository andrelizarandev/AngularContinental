// Types
import { GetModalidadesData } from '../api/modalidades/modalidades.types';
import { OptionDataIdNumber } from '../screens/submit/submit-solicitud-diseno-screen/submit-solicitud-diseno-curso.component';

export default class MatchHelper {

  static matchIdWithOptionDataIdNumber(id:number, optionDataIdNumber:OptionDataIdNumber[]) {
    return optionDataIdNumber.find(option => option.id === id)?.label || 'NO ESPECIFICADO';
  }

  static matchIdWithModalidadData (id:string, modalidadData:GetModalidadesData[]) {
    const result = modalidadData.find(modalidad => modalidad.id === Number(id))?.nombre || 'NO ESPECIFICADO';
    console.log(result);
    return result;
  }

}