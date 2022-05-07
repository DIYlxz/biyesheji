import axios from "axios"

axios.defaults.baseURL = "/api";

const service = axios.create({
    //基本路径
    baseURL: "/api",
    //响应超出时间
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
        // "Cross-Origin-Opener-Policy": "same-origin",
        // "Cross-Origin-Embedder-Policy": "require-corp",
    }
});

//请求拦截器
service.interceptors.request.use(config => {
    //在发送请求之前，进行数据转化
    config.data = JSON.stringify(config.data);
    //一定要返回，否则出现Cannot read property 'cancelToken' of undefined报错
    return config;
}, err => {
    console.log("请求错误");
    console.log(err);
})

//响应拦截器
service.interceptors.response.use(response => {
    if (response.status === 200) {
        return response.data;
    } else {
        console.log(response);
        Promise.reject();
    }
}, error => {
    console.log(error);
});

export default service;