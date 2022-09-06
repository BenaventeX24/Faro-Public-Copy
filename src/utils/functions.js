export const isMobile = () => {
  return window.innerWidth <= 960 ? true : false
}

export const parseCentreFormValues = (values) => {
  const gradeParsedValues = []
  const cSchParsedValues = []
  const careerParsedValues = []
  Object.entries(values).forEach(([key ,value]) => {
    if (key === 'grades') {
      Object.entries(value).forEach(([,{ value }]) => {
        gradeParsedValues.push(value)
      })
    }
    if (key === 'centreSchedule') {
      Object.entries(value).forEach(([,{ value }]) => {
        cSchParsedValues.push(value)
      })
    }
    if (key === 'careerParsedValues') {
      Object.entries(value).forEach(([value ]) => {
        careerParsedValues.push(value)
      })
    }
  })
  const data = {
    ...values,
    grades: gradeParsedValues,
    centreSchedule: cSchParsedValues,
    careers: careerParsedValues
  }
  console.log(data)
  return data
}