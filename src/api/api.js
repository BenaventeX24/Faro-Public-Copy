const BASE_URL = 'http://localhost:7000'

export const userValidation = (user, password) => {
  return fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "username": user,
      "password": password
    })
  }).then((response) => response.json())
}

export const sendCreatedCentre = (centreData) => {
return fetch(`${BASE_URL}/createCentre`, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    centreData
  })
}).then((response) => response)
}