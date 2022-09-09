const BASE_URL = process.env.REACT_APP_BASE_URL
const devToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaXNzdWVkIjoxNjYyNzUxMDYyMjMxLCJleHBpcmVzIjoxNjYyNzUxOTYyMjMxfQ.Z4Rsp8SayRWJ1kMc4jfXSbVhBboSs6Ni3ZC-meRkwfexmCQ2BudJB9OijjeeKcRirWNLoiSsHyA_hIB1dKIXLg'

export const userValidation = (user, password) => {
  return fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-JWT-Token': devToken
    },
    body: JSON.stringify({
      username: user,
      password: password
    })
  }).then((response) => response.json())
}

export const requestCentre = async (path, method, body) => 
  await fetch( `${BASE_URL}/${path}`, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-JWT-Token': devToken
    },
    body: JSON.stringify(body)
  })

export const sendCreatedCentre = (centreData) => {
return fetch(`${BASE_URL}/createCentre`, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-JWT-Token': devToken
  },
  body: JSON.stringify({
    centreData
  })
}).then((response) => response)
}
export const sendEditedCentre = (centreId) => {
  return fetch(`${BASE_URL}/centres/centre?name=${centreId}`,{
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type':'application/json',
      'X-JWT-Token': devToken
  },
  }).then((response) => response.json())
}
export const getCentresName = () => {
  return fetch(`${BASE_URL}/centres/centresName`,{
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type':'application/json',
      'X-JWT-Token': devToken
  },
  }
  ).then((response) => response.json())
}

export const getCentreValues = (centreId) => {
  return fetch(`${BASE_URL}/centres/centre?name=${centreId}`,{
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type':'application/json',
      'X-JWT-Token': devToken
  },
}
  ).then(
    (response) => response.json()
    )
}

//hacer controllers para cada uno de los controllers que hay en el back
//hacer serlializers