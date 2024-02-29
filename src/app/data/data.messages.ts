// Types
import { MessageData } from '../state/reducers/ui.reducer';

// Post Archivo
export const postArchivoSuccessMessage:MessageData = { 
  message:'Archivo subido con éxito', 
  body:'Tu archivo se ha procesado correctamente.',
  type:'success' 
}

// Post Produccion General
export const putProduccionGeneralSuccessMessage:MessageData = { 
  message:'Producción Actualizada', 
  body:'Tu registro de producción se ha actualizado correctamente.',
  type:'success' 
}

// Post User
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

// Post Programa
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

// Put Programa
export const putProgramaSuccessMessage:MessageData = {
  message:'Programa actualizado con éxito',
  body:'Se ha actualizado tu programa en la plataforma.',
  type:'success'
}

export const putProgramaErrorMessage:MessageData = {
  message:'Error al actualizar programa',
  body:'Revisa que tu código no se haya repetido antes.',
  type:'error'
}

// Delete Programa
export const deleteProgramaSuccessMessage:MessageData = {
  message:'Programa eliminado con éxito',
  body:'Se ha eliminado tu programa de la plataforma.',
  type:'success'
}

// Post Login
export const postLoginSuccessMessage:MessageData = {
  message:'Bienvenido',
  body:'Has iniciado sesión correctamente.',
  type:'success'
}

export const postLoginErrorMessage:MessageData = {
  message:'Error al iniciar sesión',
  body:'Revisa que tu correo y contraseña sean correctos.',
  type:'error'
}

// Post Periodo
export const postPeriodoSuccessMessage:MessageData = {
  message:'Periodo registrado con éxito',
  body:'Se ha agregado tu periodo a la plataforma.',
  type:'success'
}

// Put Periodo
export const putPeriodoSuccessMessage:MessageData = {
  message:'Periodo actualizado con éxito',
  body:'Se ha actualizado tu periodo en la plataforma.',
  type:'success'
}

// Delete Periodo
export const deletePeriodoSuccessMessage:MessageData = {
  message:'Periodo eliminado con éxito',
  body:'Se ha eliminado tu periodo de la plataforma.',
  type:'success'
}

// Post Rol
export const postRolSuccessMessage:MessageData = {
  message:'Rol registrado con éxito',
  body:'Se ha agregado tu rol a la plataforma.',
  type:'success'
}

// Delete Rol
export const deleteRolSuccessMessage:MessageData = {
  message:'Rol eliminado con éxito',
  body:'Se ha eliminado tu rol de la plataforma.',
  type:'success'
}

// Get Método
export const getMetodoErrorMessage:MessageData = {
  message:'Error al obtener método',
  body:'Revisa que tu método no se haya repetido antes.',
  type:'error'
}

export const getMetodoSuccessMessage:MessageData = {
  message:'Método obtenido con éxito',
  body:'Se ha obtenido tu método con tu modalidad y formato.',
  type:'success'
}

// Post Método
export const postMetodoSuccessMessage:MessageData = {
  message:'Método registrado con éxito',
  body:'Se ha agregado tu método a la plataforma.',
  type:'success'
}