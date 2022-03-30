export default {
    namespaced: true,
    state: () => ({
        //视频信息
        videoInfo: localStorage.getItem("videoInfo") ? JSON.parse(localStorage.getItem("videoInfo")) : null,
    }),
    mutations: {
        setVideoInfo(state, obj) {
            let _obj = JSON.stringify(obj);
            localStorage.setItem("videoInfo", _obj);
            state.videoInfo = obj;
        },
        removeVideoInfo() {
            localStorage.removeItem("videoInfo");
        }
    },
}