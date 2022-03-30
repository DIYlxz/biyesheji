export default {
    namespaced: true,
    state: () => ({
        //使用账号
        user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
        //喜爱数量
        userGoodNum: localStorage.getItem("ugn") ? JSON.parse(localStorage.getItem("ugn")) : 0,
    }),
    mutations: {
        setUser(state, obj) {
            let _obj = JSON.stringify(obj);
            localStorage.setItem("user", _obj);
            state.user = obj;
        },
        removeUser() {
            localStorage.removeItem("user");
        },
        setUserGoodNum(state, num) {
            localStorage.setItem("ugn", num);
            state.userGoodNum = num;
        },
        removeUserGoodNum() {
            localStorage.removeItem("ugn");
        }
    },
}