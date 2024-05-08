import { getParamFromUrl,isEmpty } from "../common.js";

const movieId = getParamFromUrl("id");

const $reviewEdit = document.querySelector("#review-edit");
const $reviewEditIndex = document.querySelector("#review-edit-index");
const $editUserName = document.querySelector("#edit-username");
const $editPassword = document.querySelector("#edit-password");
const $editReview = document.querySelector("#edit-review");

const $reviewDelete = document.querySelector("#review-delete");
const $reviewDeleteIndex = document.querySelector("#review-delete-index");
const $deletePassword = document.querySelector("#delete-password");

const isNotNumber = (value) => {
  return !/^[0-9]*$/.test(value);
};

const isMoreThan4Length = (value) => {
  return value.toString().length < 4;
};

const isNotEqual = (value1, value2) => {
  return value1 !== value2;
};

const getReviewsFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("reviews") || "[]");
};

const getReviewHTML = (review, index) => {
  return `
    <div class="review-data">
        <p class="namespace">${review["username"]}</p>
        <p class="reviewspace">${review["review"]}</p>
        <div class="card-btn">
            <button type="button" id="fixbtn-${index}" style="border:0;" class="btn btn-outline-secondary">수정</button>
            <button type="button" id="delbtn-${index}" style="border:0;" class="btn btn-outline-secondary">삭제</button>
        </div>
    </div>
    `;
};

const submitReview = () => {
  const $username = document.querySelector("#username");
  const $password = document.querySelector("#password");
  const $review = document.querySelector("#review");

  // 유저이름 유효성
  if (isEmpty($username.value)) {
    return alert("이름이 입력되지 않았습니다.");
  }
  // 비밀번호 유효성
  if (isEmpty($password.value)) {
    return alert("비밀번호가 입력되지 않았습니다.");
  }
  if (isNotNumber($password.value)) {
    return alert("비밀번호는 숫자로만 이루어져야 합니다.");
  }

  if (isMoreThan4Length($password.value)) {
    return alert("비밀번호는 4자리 이상 입력해야 합니다.");
  }

  // 리뷰 유효성
  if (isEmpty($review.value)) {
    return alert("리뷰가 입력되지 않았습니다.");
  }

  const reviewData = {
    movieId: movieId,
    username: $username.value,
    password: $password.value,
    review: $review.value,
  };

  let reviewArr = getReviewsFromLocalStorage();
  reviewArr.push(reviewData);
  localStorage.setItem("reviews", JSON.stringify(reviewArr));

  alert("리뷰가 정상적으로 저장되었습니다.");
  window.location.reload();
};

const showEditModal = (index) => {
  const reviewArr = getReviewsFromLocalStorage();

  $editUserName.value = reviewArr[index]["username"];
  $editReview.value = reviewArr[index]["review"];
  $editPassword.value = "";

  $reviewEdit.style.display = "block";
  $reviewEditIndex.value = index;
};

const showDeleteModal = (index) => {
  $deletePassword.value = "";

  $reviewDelete.style.display = "block";
  $reviewDeleteIndex.value = index;
};

const closeEditModal = () => {
  $reviewEdit.style.display = "none";
};

const closeDeleteModal = () => {
  $reviewDelete.style.display = "none";
};

const updateReview = () => {
  let reviewArr = getReviewsFromLocalStorage();
  const index = $reviewEditIndex.value;
  if (isEmpty($editUserName.value)) {
    return alert("이름이 입력되지 않았습니다.");
  }
  if (isEmpty($editReview.value)) {
    return alert("리뷰가 입력되지 않았습니다.");
  }
  if (isNotEqual($editPassword.value, reviewArr[index]["password"])) {
    return alert("비밀번호가 일치하지 않습니다.");
  }

  const editData = {
    username: $editUserName.value,
    password: $editPassword.value,
    review: $editReview.value,
    movieId: movieId,
  };

  reviewArr[index] = editData;
  localStorage.setItem(`reviews`, JSON.stringify(reviewArr));

  alert("리뷰가 정상적으로 수정되었습니다.");
  window.location.reload();
};

const deleteReview = () => {
  let reviewArr = getReviewsFromLocalStorage();
  const index = $reviewDeleteIndex.value;

  if (isNotEqual($deletePassword.value, reviewArr[index]["password"])) {
    return alert("비밀번호가 일치하지 않습니다.");
  }

  reviewArr.splice(index, 1);
  localStorage.setItem(`reviews`, JSON.stringify(reviewArr));

  alert("리뷰가 정상적으로 삭제되었습니다.");
  window.location.reload();
};

export const getReviewData = () => {
  const reviewArr = getReviewsFromLocalStorage();
  reviewArr.forEach((review, index) => {
    if (isNotEqual(review["movieId"], movieId)) return;

    const $reviewList = document.querySelector("#review-list");
    $reviewList.insertAdjacentHTML("beforeend", getReviewHTML(review, index));

    document.querySelector(`#fixbtn-${index}`).addEventListener("click", () => {
      showEditModal(index);
    });
    document.querySelector(`#delbtn-${index}`).addEventListener("click", () => {
      showDeleteModal(index);
    });
  });
};

document.querySelector("#submit").addEventListener("click", submitReview);

document.querySelector("#edit").addEventListener("click", updateReview);
document.querySelector("#edit-cancle").addEventListener("click", closeEditModal);

document.querySelector("#delete").addEventListener("click", deleteReview);
document.querySelector("#delete-cancle").addEventListener("click", closeDeleteModal);
