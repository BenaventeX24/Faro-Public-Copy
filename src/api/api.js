const BASE_URL = process.env.REACT_APP_BASE_URL

export const userValidation = (user, password) => {
  return fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: user,
      password: password
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

export const getCentresName = () => {
  return fetch(`${BASE_URL}/centres/centresName`,{
    method: 'GET',
    headers: {'Content-Type':'application/json',
    Accept: 'application/json',
    'X-JWT-Token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaXNzdWVkIjoxNjYyNDY2NjMyNDIxLCJleHBpcmVzIjoxNjYyNDcwMjMyNDIxfQ.W4Rukp5609hgeNA6VqTjkEakLHmSQaTv4NKM_Dry2q6cr_O7U-8TM12BvilusaMoZ2agVTTKiaPCjvi0ICj0pw'
  },
  }
  ).then((response) => response.json())
}