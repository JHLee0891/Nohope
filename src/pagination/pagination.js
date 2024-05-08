import { setParamToUrl } from "../common.js";
import { getLoadData } from "../fetchAPI.js";

let nextPage;
let prevPage;

export const renderPagination = (pageNumber, totalPage) => {
  const pageCount = 10;
  const pageGroup = Math.ceil(pageNumber / pageCount);
  let lastPageNumber = pageGroup * pageCount;

  if (lastPageNumber > totalPage) {
    lastPageNumber = totalPage;
  }

  let firstPageNumber = lastPageNumber - (pageCount - 1);
  if (firstPageNumber <= 0 ) {
    firstPageNumber = 1;
  }

  nextPage = lastPageNumber + 1;
  prevPage = firstPageNumber - 1;

  updatePaginationVisibility("btn-prev", prevPage === 0 ? "hidden" : "visible");
  updatePaginationVisibility(
    "btn-next",
    nextPage > totalPage ? "hidden" : "visible"
  );

  const paginationList = document.getElementById("pagination-buttons");
  paginationList.innerHTML = "";
  for (let i = firstPageNumber; i <= lastPageNumber && firstPageNumber !== lastPageNumber; i++) {
    const pageHTML = document.createElement("div");
    pageHTML.innerHTML = `<button class="page-number-btn" id="page-${i}">${i}</button>`;
    pageHTML.addEventListener("click", (e) => {
      setParamToUrl("page", i);
      getLoadData(e.target.textContent);
    });
    paginationList.appendChild(pageHTML);
  }

  // 페이지 앞,뒷 화살표에 기능 추가하기
  document.querySelectorAll("#pagination-controls > span").forEach((elem) => {
    elem.addEventListener("click", (e) => {
      // 만약 뒷,앞페이지 버튼을 누르면 localStorage의 page값 변경 해주기
      if (e.target.id === "btn-next") {
        setParamToUrl("page", nextPage);
      } else {
        setParamToUrl("page", prevPage);
      }
    });
  });
};

const updatePaginationVisibility = (elementId, visibility) => {
  document.getElementById(elementId).style.visibility = visibility;
};
