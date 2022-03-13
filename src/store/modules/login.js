export default {
    namespaced: true,
    state: () => ({
        //切换到登录界面
        loginState: true,
        //使用账号
        user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    }),
    mutations: {
        setLoginState(state) {
            state.loginState = state.loginState ? false : true;
        },
        setUser(state, obj) {
            let _obj = JSON.stringify(obj);
            localStorage.setItem("user", _obj);
            state.user = obj;
        },
        removeUser(state) {
            state.user = null,
            localStorage.removeItem("user");
        }
    },
}