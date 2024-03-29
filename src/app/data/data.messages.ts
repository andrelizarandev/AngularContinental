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

export const getProduccionGeneralByIdSuccessMessage:MessageData = {
  message:'Producción obtenida con éxito',
  body:'Se ha obtenido tu producción con éxito.',
  type:'success'
}

// Get Single User
export const getUserByIdErrorMessage:MessageData = {
  message:'Error al obtener usuario',
  body:'Revisa que tu usuario exista.',
  type:'error'
}

export const getUserByIdSuccessMessage:MessageData = {
  message:'Usuario obtenido con éxito',
  body:'Se ha obtenido tu usuario con éxito.',
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

// Put User
export const putUserSuccessMessage:MessageData = {
  message:'Usuario actualizado con éxito',
  body:'Se ha actualizado tu usuario en la plataforma.',
  type:'success'
}

export const putUserErrorMessage:MessageData = {
  message:'Error al actualizar usuario',
  body:'Revisa que tu correo no se haya repetido antes.',
  type:'error'
}

// Delete User
export const deleteUserSuccessMessage:MessageData = {
  message:'Usuario eliminado con éxito',
  body:'Se ha eliminado tu usuario de la plataforma.',
  type:'success'
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

export const noMetodoAlreadySavedMessage:MessageData = {
  message:'No tienes método registrado',
  body:'No tienes método registrado con esta modalidad y formato.',
  type:'info'

}

// Post Método
export const postMetodoSuccessMessage:MessageData = {
  message:'Método registrado con éxito',
  body:'Se ha agregado tu método a la plataforma.',
  type:'success'
}

export const postMetodoErrorMessage:MessageData = {
  message:'Error al registrar método',
  body:'Revisa que tu método no se haya repetido antes.',
  type:'error'
}

export const postMetodoEveryRegisterIsAt100PercentSuccessMessage:MessageData = {
  message:'Método registrado con éxito',
  body:'Todos los formatos están registrados al 100%.',
  type:'success'
}

export const postMetodoEveryRegisterIsNotAt100PercentSuccessMessage:MessageData = {
  message:'Método registrado con éxito',
  body:'Algunos formatos no están registrados al 100%.',
  type:'info'
}

export const porcentajeRealWasCompleteAtTheBeginningMessageButNotNow:MessageData = {
  message:'Porcentaje Real',
  body:'El porcentaje real estaba completo al principio, pero ya no lo está.',
  type:'info'
}

// Put Validación
export const putValidacionSuccessMessage:MessageData = {
  message:'Validación actualizada con éxito',
  body:'Se ha actualizado tu validación en la plataforma.',
  type:'success'
}

// Already confirmed message
export const alreadyConfirmedMessage:MessageData = {
  message:'Ya confirmado',
  body:'Ya has confirmado esta validación.',
  type:'info'
}

// Form
export const formErrorMessage:MessageData = {
  message:'Error en formulario',
  body:'Revisa que todos los campos estén correctamente llenos.',
  type:'error'
}

// Post
export const completarValidacionSuccessMessage:MessageData = {
  message:'Validación completada con éxito',
  body:'Se ha completado tu validación en la plataforma.',
  type:'success'
}

export const getCompletarValidacionSuccessMessage:MessageData = {
  message:'Validación obtenida con éxito',
  body:'Se ha obtenido tu validación con éxito.',
  type:'success'
}

export const completedValidacionWithAtLeastOneObservationMessage:MessageData = {
  message:'Validación completada con observaciones',
  body:'Se ha completado tu validación con observaciones.',
  type:'info'
}