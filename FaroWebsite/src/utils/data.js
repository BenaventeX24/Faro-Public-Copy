import * as Yup from 'yup';

export const centreValidation = () => Yup.object().shape({
  centreName: Yup.string()
    .required('Ingrese el nombre del centro'),
  addressStreet: Yup.string()
    .required('Ingrese la dirección del centro'),
  addressNumber: Yup.number()
    .required('Ingrese el numero de puerta'),
  free: Yup.boolean().nullable()
    .required('Ingrese el tipo del centro'),
  centrePhone: Yup.string()
    .min(8, 'Ingrese un numero correcto'),
  schoolarLevel: Yup.string()
    .required('Ingrese los grados del centro'),
  centreSchedules: Yup.array()
    .min(1, 'Ingrese almenos un horario')
    .required('Ingrese los horarios del centro'),
  careers: Yup.array().nullable()
    .min(1, 'Ingrese al menos una carrera')
    .required('Ingrese al menos una carrera al centro')
})

export const AddCareerValidation = () => Yup.object().shape({
  careerName: Yup.string()
    .required('Ingrese el nombre de la carrera'),
  careerTitle: Yup.string()
    .required('Ingrese el título de la carrera'),
  careerDescription: Yup.string()
    .required('Ingrese la descripción de la carrera'),
  careerDuration: Yup.string()
    .required('Ingrese la duracion de la carrera'),
})

export const schoolarLevelOptions = [
  { value: 'Sin elegir', label: 'sin elegir', isDisabled: true },
  { value: 'Bachillerato', label: 'Bachillerato' },
  { value: 'Universitario', label: 'Universitario' }
]
export const centreScheduleOptions = [
  { value: 'Sin elegir', label: 'sin elegir', isDisabled: true },
  { value: 'Vespertino', label: 'Vespertino' },
  { value: 'Matutino', label: 'Matutino' },
  { value: 'Nocturno', label: 'Nocturno' },
  { value: 'Horario completo', label: 'Horario completo' },
  
]
export const freeOptions = [
    { value: 'Sin elegir', label: 'sin elegir', isDisabled: true },
    { value: false, label: 'Privado' },
    { value: true, label: 'Público' }
]
export const style = {
  option: (styles, state) => ({
    ...styles,
    backgroundColor: state.isSelected ? '' : '',
    color: '#fff'
  })
}
