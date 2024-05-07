import { setParamToUrl } from "../common.js";

// 언어 버튼에 param을 추가하는 기능을 addEventListener로 추가
export const addLangEvent = () => {

    const setLang = (language) => {
        setParamToUrl("language",language);
    }

    document.getElementById("lang-ko-button").addEventListener("click", () => { setLang("ko-KR")});
    document.getElementById("lang-en-button").addEventListener("click", () => { setLang("en-US")});

};
