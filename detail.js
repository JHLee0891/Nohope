async function getTMDBData(url) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YzhkYWIyMDlkN2FiNjQ2MjBkNWY3NjM0YTk2Y2Y4ZSIsInN1YiI6IjY2MmEyY2FlMWQ3OGYyMDExZTJmZWZhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.F_228f-CVuuIOTCRJnkPvqxS1a_1vM1ikZ_tHzTXTM4",
    },
  };

  let response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("HTTP status " + response.status);
  }

  return response.json();
}

async function getLoadData(pageNumber = 1) {
  // detail page API
  const DPdata = await getTMDBData(
    `https://api.themoviedb.org/3/movie/${id}?language=en-US`
  );
  console.log(DPdata);
}

// index 페이지로 가기
getClickEvent = () => {
  window.location.href = `index.html`;
};
const goIndex = document.getElementById("btn1");
goIndex.addEventListener("click", getClickEvent);

// 각 포스터에 맞는 id값
const id = new URLSearchParams(window.location.search).get("id");

getLoadData();
