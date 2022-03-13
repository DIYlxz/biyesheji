export default {
    namespaced: true,
    state: () => ({
        //背景色缓存
        backColor: localStorage.getItem("backColor") ? localStorage.getItem("backColor") : "white",
    }),
    mutations: {
        setBackColore(state) {
            state.backColor = state.backColor == "white" ? "black" : "white";
            localStorage.setItem("backColor", state.backColor);
        },
    },
}