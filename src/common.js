export const getIdFromUrl = () => {
  return new URLSearchParams(location.search).get("id");
};

export const getLangFromUrl = () =>{
  const lang = new URLSearchParams(location.search).get("language");
  return lang !== null ? lang : "en-US";
}

export const getSortTypeFromUrl = () => {
  const sortType = new URLSearchParams(location.search).get("sortType");
  return sortType !== null ? sortType : "vote";
}

export const setParamToUrl = (key,value) =>{
  const url = new URLSearchParams(location.search);
  url.set(key,value);
  window.location.search = url;
}

export const getBaseUrl = () => {
  return "https://image.tmdb.org/t/p/w342/";
};
