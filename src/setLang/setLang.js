import { setParamToUrl } from "../common.js";

export const addLangEvent = () => {

    const setLang = (language) => {
        setParamToUrl("language",language);
    }

    document.getElementById("lang-ko-button").addEventListener("click", () => { setLang("ko-KR")});
    document.getElementById("lang-en-button").addEventListener("click", () => { setLang("en-US")});

};
