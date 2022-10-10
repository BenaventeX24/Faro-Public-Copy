const API_ROUTES = {
<<<<<<< HEAD
  LOGIN: () => `/login`,
  CENTRES_COORDINATES: () => `/centres/CentresCoordinates`,
  CENTRE: (id) => `/centres/centre?id=${id}`,
  CENTRES: () => `centres/centresName`,
  CENTRE_BASE: () => "/centres",
  FUZZY_CENTRE: (name) => `/centres/centre?nameLike=${name}`,
  CENTRE_BY_NAME: (name) => `/centres/centre?name=${name}`,
  FUZZY_CAREER: (name) => `/careers/career?nameLike=${name}`,
  CAREER: (id) => `careers/career?idCareer=${id}`,
  DELETE_CAREER: (idCareer, idCentre) =>
    `careers/career?idCareer=${idCareer}&idCentre=${idCentre}`,
}

export { API_ROUTES }
=======
  EXAMPLE: "/example",
  EXAMPLE_ID: (id) => `/example/${id}`,
  CENTRES_COORDINATES: `/public/CentresCoordinates`,
  CENTRE_INFO: (id) => `/public/centre?id=${id}`,
};

export { API_ROUTES };
>>>>>>> develop
