import api from "./index"

export const sendPost = (url, data) => {
    return api({
        url,
        method: "post",
        data,
    });
}

export const sendGet = (url, msg) => {
    return api({
        url,//接口
        method: "get",
        params: {
            data: msg,
        },
    });
};