const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOTkxNzZiZjc5YjQwOGM0NTczMWFjYjI3YTQyOTZiZSIsInN1YiI6IjY2Mjc5NmYxMjU4ODIzMDE3ZDkzY2Y5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KcmxaX1HaVpSUCVMkWhDuQrFIh2rY5s0OY3XfO9RE0c'
    }
  };

  fetch('https://api.themoviedb.org/3/movie/movie_id?language=en-US', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));