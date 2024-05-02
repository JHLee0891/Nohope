let idCount = 0;
let editId = 0;
let movieId = new URLSearchParams(location.search).get("id")

const $username = document.querySelector("#username");
const $password = document.querySelector("#password");
const $review = document.querySelector("#review");
const $submit = document.querySelector("#submit");
const $reviewList = document.querySelector("#review-list");

const $reviewEdit = document.querySelector("#reviewEdit");
const $editusername = document.querySelector("#editusername");
const $editpassword = document.querySelector("#editpassword");
const $editreview = document.querySelector("#editreview");
const $editsubmit = document.querySelector("#editsubmit");
const $editclose = document.querySelector("#editclose");

const $reviewdelete = document.querySelector("#reviewdelete");
const $deletepassword = document.querySelector("#deletepassword");
const $delete = document.querySelector("#delete");
const $deleteCancle = document.querySelector("#deleteCancle");

//페이지 정보 변수 pageInfo

const getCardHTML = (review, id) => {
  return `
    <div class="reviewdata" id="reviewdata${id}">
        <p class="namespace">${review["username"]}</p>
        <p class="reviewspace">${review["review"]}</p>
        <div class="cardbtn">
            <button type="button" id="fixbtn${id}" style="border:0;" class="btn btn-outline-secondary" id="fixbtn">수정</button>
            <button type="button" id="delbtn${id}" style="border:0;" class="btn btn-outline-secondary" id="delbtn">삭제</button>
        </div>
    </div>
    `;
};

const reviewArr = [];

const submitReview = () => {
  if ($username.value === "") {
    return alert("이름이 입력되지 않았습니다.");
  }

  if (isNaN(Number($password.value))) {
    return alert("비밀번호는 숫자로만 이루어져야 합니다.");
  }
  else {
    if ($password.value === "") {
      return alert("비밀번호가 입력되지 않았습니다.");
    }
    else if($password.value.length !== 4){
      return alert("비밀번호는 4자리만 가능합니다.")
    }
  }


  console.log(isNaN(Number($password.value)));

  if ($review.value === "") {
    return alert("리뷰가 입력되지 않았습니다.");
  }

  localStorage.setItem("id", ++idCount);
  const reviewData = {
    //title: 영화 제목
    username: $username.value,
    password: $password.value,
    review: $review.value,
    movieId : movieId
  };

  //세부 사항 페이지에서 영화 내용을 받아서 하나의 웹페이지에서 보여주는 경우에
  //storage를 중복으로 사용해서 리뷰를 출력하면 모든 영화의 리뷰가 한번에 보인다.
  //리뷰 데이터에 title 분류
  alert("리뷰가 정상적으로 저장되었습니다.");
  localStorage.setItem(`reviewdata${idCount}`, JSON.stringify(reviewData));
  window.location.reload();
};

const getReviewData = () => {
  if (localStorage.getItem("id") === null) {
    return;
  }
  idCount = localStorage.getItem("id");
  for (let i = 1; i <= idCount; i++) {
    const review = localStorage.getItem(`reviewdata${i}`);
    const reviewData = JSON.parse(review);

    if((reviewData['movieId']) !== movieId){
      continue;
    }

    $reviewList.insertAdjacentHTML(
      "beforeend",
      getCardHTML(reviewData, i)
    );
    document.querySelector(`#fixbtn${i}`).addEventListener("click", () => {
      showEditPage(i);
    });
    document.querySelector(`#delbtn${i}`).addEventListener("click", () => {
      showDeletePage(i);
    });
  }
};

const showEditPage = (id) => {
  const review = localStorage.getItem(`reviewdata${id}`);
  const reviewData = JSON.parse(review);
  $editusername.value = reviewData["username"];
  $editreview.value = reviewData["review"];
  $reviewEdit.style.display = "block";
  editId = id;
};

const closeReviewEdit = () => {
  $reviewEdit.style.display = "none";
};

const submitEditReview = () => {
  const review = localStorage.getItem(`reviewdata${editId}`);
  const reviewData = JSON.parse(review);

  if ($editpassword.value !== reviewData["password"]) {
    return alert("비밀번호가 틀렸습니다.");
  }

  if ($editusername.value === "") {
    return alert("이름이 입력되지 않았습니다.");
  }

  if ($editreview.value === "") {
    return alert("리뷰가 입력되지 않았습니다.");
  }

  const editData = {
    //title: 영화 제목
    username: $editusername.value,
    password: $editpassword.value,
    review: $editreview.value,
    movieId:movieId
  };

  //세부 사항 페이지에서 영화 내용을 받아서 하나의 웹페이지에서 보여주는 경우에
  //storage를 중복으로 사용해서 리뷰를 출력하면 모든 영화의 리뷰가 한번에 보인다.
  //리뷰 데이터에 title 분류

  alert("리뷰가 정상적으로 수정되었습니다.");
  localStorage.setItem(`reviewdata${editId}`, JSON.stringify(editData));
  window.location.reload();
};

const showDeletePage = (id) => {
  $deletepassword.value = "";
  $reviewdelete.style.display = "block";
  editId = id;
};

const deleteReview = () => {
  const review = localStorage.getItem(`reviewdata${editId}`);
  const reviewData = JSON.parse(review);
  if ($deletepassword.value !== reviewData["password"]) {
    return alert("비밀번호가 틀렸습니다.");
  }
  alert("리뷰가 정상적으로 삭제되었습니다.");
  dataMove(editId);
  $reviewdelete.style.display = "none";
  window.location.reload();
};

const dataMove = (id) => {
  console.log(id);
  for (let i = id; i < idCount; i++) {
    const idname = localStorage.getItem(`reviewdata${i + 1}`);
    localStorage.setItem(`reviewdata${i}`, idname);
  }
  localStorage.removeItem(`reviewdata${idCount}`);
  idCount--;
  localStorage.setItem("id", idCount);
};

const deleteWindowClose = () => {
  $reviewdelete.style.display = "none";
};

$submit.addEventListener("click", submitReview);
$editclose.addEventListener("click", closeReviewEdit);
$editsubmit.addEventListener("click", submitEditReview);
$delete.addEventListener("click", deleteReview);
$deleteCancle.addEventListener("click", deleteWindowClose);

const awake = () => {
  getReviewData();
};
awake();
