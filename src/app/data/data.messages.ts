// Types
import { MessageData } from '../state/reducers/ui.reducer';

export const postArchivoSuccessMessage:MessageData = { 
  message:'Archivo subido con éxito', 
  body:'Tu archivo se ha procesado correctamente.',
  type:'success' 
}

export const putProduccionGeneralSuccessMessage:MessageData = { 
  message:'Producción Actualizada', 
  body:'Tu registro de producción se ha actualizado correctamente.',
  type:'success' 
}

export const postUserSuccessMessage:MessageData = {
  message:'Usuario registrado con éxito',
  body:'Se ha agregado tu usuario a la plataforma.',
  type:'success'
}

export const postUserErrorMessage:MessageData = {
  message:'Error al registrar usuario',
  body:'Revisa que tu correo no se haya repetido antes.',
  type:'error'
}

export const postProgramaSuccessMessage:MessageData = {
  message:'Programa registrado con éxito',
  body:'Se ha agregado tu programa a la plataforma.',
  type:'success'
}

export const postProgramaErrorMessage:MessageData = {
  message:'Error al registrar programa',
  body:'Revisa que tu código no se haya repetido antes.',
  type:'error'
}