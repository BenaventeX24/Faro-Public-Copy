const API_ROUTES = {
  EXAMPLE: "/example",
  EXAMPLE_ID: (id) => `/example/${id}`,
  CENTRES_COORDINATES: `/public/CentresCoordinates`,
  CENTRE_INFO: (id) => `/public/centre?id=${id}`,
};

export { API_ROUTES };
