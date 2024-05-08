export const getParamFromUrl = (param) => {
  return new URLSearchParams(location.search).get(param);
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
  url.set("likes", false);
  url.set(key,value);
  window.location.search = url;
}

export const removeAllUrlParams = () => {
  history.replaceState({}, null, location.pathname);
}

export const getBaseUrl = () => {
  return "https://image.tmdb.org/t/p/w342/";
};

export const isEmpty = (value) => {
  return (
    value === "" || value === null || value === undefined || /^\s*$/.test(value)
  );
};


