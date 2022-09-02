export const isMobile = () => {
  return window.innerWidth <= 960 ? true : false
}

export const formToJson = (form) => {
  const formJson = new FormData(form)
  return {formValues: Object.fromEntries(formJson.entries())}
}