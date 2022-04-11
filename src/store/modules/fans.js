export default {
    namespaced: true,
    state: () => ({
        //视频信息
        fansInfo: localStorage.getItem("fansInfo") ? JSON.parse(localStorage.getItem("fansInfo")) : [],
        shareUrl: localStorage.getItem("surl") ? localStorage.getItem("surl") : [],
        shareUrlSwich: false,
    }),
    mutations: {
        setFansInfo(state, obj) {
            let _obj = JSON.stringify(obj);
            localStorage.setItem("fansInfo", _obj);
            state.fansInfo = obj;
        },
        removeFansInfo() {
            localStorage.removeItem("fansInfo");
        },
        setShareUrl(state, constant) {
            state.shareUrl = constant;
            state.shareUrlSwich = true;
            localStorage.setItem("surl", constant);
        },
        setShareUrlSwich(state) {
            state.shareUrlSwich = false;
        }
    },
}