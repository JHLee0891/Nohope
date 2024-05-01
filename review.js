let idCount = 0;
const $username = document.querySelector('#username');
const $password = document.querySelector('#password');
const $review = document.querySelector('#review');
const $submit = document.querySelector('#submit');
const $reviewList = document.querySelector('#review-list');

//페이지 정보 변수 pageInfo

const getCardHTML = (review, id) => {
    console.log(review['username']);
    return `
    <div id="reviewdata${id}">
        ${review['username']}<br>
        ${review['review']}<br>
        <button type="button" id="fixbtn" class="btn btn-light" id="fixbtn">수정</button>
        <button type="button" id="delbtn" class="btn btn-light" id="delbtn">삭제</button>
    </div>
    `;
}

const reviewArr = [];

const submitReview = () => {
    if ($username.value === "") {
        return alert("이름이 입력되지 않았습니다.");
    }

    if ($password.value === "") {
        return alert("비밀번호가 입력되지 않았습니다.");
    }

    if ($review.value === "") {
        return alert("리뷰가 입력되지 않았습니다.");
    }

    localStorage.setItem("id", ++idCount);
    const reviewData = {
        //title: 영화 제목
        username: $username.value,
        password: $password.value,
        review: $review.value
    }

    //세부 사항 페이지에서 영화 내용을 받아서 하나의 웹페이지에서 보여주는 경우에
    //storage를 중복으로 사용해서 리뷰를 출력하면 모든 영화의 리뷰가 한번에 보인다.
    //리뷰 데이터에 title 분류

    localStorage.setItem(`reviewdata${idCount}`, JSON.stringify(reviewData));
}

const getReviewData = () => {
    if (localStorage.getItem("id") === null) {
        return;
    }
    idCount = localStorage.getItem("id");
    for (let i = 1; i <= idCount; i++) {
        const review = localStorage.getItem(`reviewdata${i}`)
        //if(review['title'] !== pageInfo['title']){
        //      continue;
        //}
        console.log("해치웠나?");
        $reviewList.insertAdjacentHTML('beforeend', getCardHTML(JSON.parse(review), i));
    }
    console.log(reviewArr);
}

const awake = () => {
    getReviewData();
}

$submit.addEventListener("click", submitReview);
$submit.addEventListener("click", submitReview);
$submit.addEventListener("click", submitReview);
awake();