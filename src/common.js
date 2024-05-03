export const getIdFromUrl = () => {
  return new URLSearchParams(location.search).get("id");
};

export const getBaseUrl = () => {
  return "https://image.tmdb.org/t/p/w342/";
};
