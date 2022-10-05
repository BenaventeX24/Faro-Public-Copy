const API_ROUTES = {
  EXAMPLE: "/example",
  EXAMPLE_ID: (id) => `/example/${id}`,
  CENTRES_COORDINATES: () => `/centres/CentresCoordinates`,
  CENTRE: (id) => `/centres/centre?id=${id}`,
  FUZZY_CENTRE: (name) => `/centres/centre?nameLike=${name}`,
  FUZZY_CAREER: (name) => `/careers/career?nameLike=${name}`,
};

export { API_ROUTES };
