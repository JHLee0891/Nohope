// getRankingData로 부터 데이터를 받아와 HTML에 적용하는 함수
export const setRankings = (movieDatas) => {
    const detailContent = document.querySelector("#ranking-field");

    detailContent.innerHTML = `
    <span
    id="boxoffice-logo"
    class="material-symbols-outlined mousePointer"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    Trophy
    </span>
    <ul class="dropdown-menu dropdown-menu-dark">
      <li><a class="dropdown-item">국내 주간 박스오피스 순위</a></li>
      <li><a class="dropdown-item">1. ${movieDatas[0]["movieNm"]}</a></li>
      <li><a class="dropdown-item">2. ${movieDatas[1]["movieNm"]}</a></li>
      <li><a class="dropdown-item">3. ${movieDatas[2]["movieNm"]}</a></li>
      <li><a class="dropdown-item">4. ${movieDatas[3]["movieNm"]}</a></li>
      <li><a class="dropdown-item">5. ${movieDatas[4]["movieNm"]}</a></li>
      <li><a class="dropdown-item">6. ${movieDatas[5]["movieNm"]}</a></li>
      <li><a class="dropdown-item">7. ${movieDatas[6]["movieNm"]}</a></li>
      <li><a class="dropdown-item">8. ${movieDatas[7]["movieNm"]}</a></li>
      <li><a class="dropdown-item">9. ${movieDatas[8]["movieNm"]}</a></li>
      <li><a class="dropdown-item">10. ${movieDatas[9]["movieNm"]}</a></li>
    </ul>
  `;
};

// 박스 오피스에서 데이터를 들고오는 함수
export async function getCOFIXdata(Date) {
    const response = await fetch(
        `http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json?key=9020bc1dc0bdfb94ebf50e3945318630&weekGb=0&targetDt=${Date}`
    );

    if (!response.ok) {
        throw new Error("HTTP status " + response.status);
    }

    return response.json();
}

// 박스오피스 api에서 데이터를 긁어와 필요한 데이터로 수정하여 저장후 SetRankings 함수 작동
export async function getRankingData() {
    //영화진흥 위원회 박스 오피스
    let rankingDatas = await getCOFIXdata(getDateWeekBefore());
    rankingDatas = rankingDatas["boxOfficeResult"]["weeklyBoxOfficeList"];

    setRankings(rankingDatas);
}

// 날짜 지정하는 함수
const getDateWeekBefore = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month1 = date.getMonth();
    const day1 = date.getDate();

    const dateData = new Date(year, month1, day1 - 7).toLocaleDateString();
    const result = dateData.split(". ");
    result[2] = result[2].slice(0, 2);
    const data =
        result[0] + ("0" + result[1]).slice(-2) + ("0" + result[2]).slice(-2);
    return data;
};
