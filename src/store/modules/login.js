export default {
    namespaced: true,
    state: () => ({
        //使用账号
        user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    }),
    mutations: {
        setUser(state, obj) {
            let _obj = JSON.stringify(obj);
            localStorage.setItem("user", _obj);
            state.user = obj;
        },
        removeUser() {
            localStorage.removeItem("user");
        }
    },
}