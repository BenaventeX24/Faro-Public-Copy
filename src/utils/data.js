import * as Yup from 'yup';

export const centreValidation = () => Yup.object().shape({
  centreName: Yup.string()
    .required('Porfavor ingrese el nombre del centro'),
  centreDirection: Yup.string()
    .required('Porfavor ingrese la dirección del centro'),
  free: Yup.boolean().nullable()
    .required('Porfavor ingrese el tipo del centro'),
  centrePhone: Yup.string()
    .min(8, 'Ingrese un numero correcto'),
  grades: Yup.array()
    .min(1, 'Porfavor ingrese al menos un grado')
    .required('Porfavor ingrese los grados del centro'),
  centreSchedule: Yup.array()
    .min(1, 'Porfavor ingrese al menos un horario')
    .required('Porfavor ingrese los horarios del centro'),
  careers: Yup.array().nullable()
    .min(1, 'Porfavor ingrese al menos una carrera')
    .required('Porfavor ingrese al menos una carrera al centro'),
  pagelink: Yup.string().matches(
    /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
    'Ingrese una url correcta')
})

export const AddCareerValidation = () => Yup.object().shape({
  careerName: Yup.string()
    .required('Porfavor ingrese el nombre de la carrera'),
  careerTitle: Yup.string()
    .required('Porfavor ingrese el título de la carrera'),
  careerDescription: Yup.string()
    .required('Porfavor ingrese la descripción de la carrera'),
  careerDuration: Yup.string()
    .required('Porfavor ingrese la duracion de la carrera'),
})

export const gradeOptions = [
  { value: 'Sin elegir', label: 'sin elegir', isDisabled: true },
  { value: '1ero bachillerato', label: '1ero bachillerato' },
  { value: '2do bachillerato', label: '2do bachillerato' },
  { value: 'Universitario', label: 'Universitario' }
]
export const horaryOptions = [
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
