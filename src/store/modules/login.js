export default {
    namespaced: true,
    state: () => ({
        //使用账号
        user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
        //喜爱数量
        userGoodNum: localStorage.getItem("ugn") ? localStorage.getItem("ugn") : 0,
        //收藏信息
        collectionInfo: localStorage.getItem("ci") ? JSON.parse(localStorage.getItem("ci")) : {},
        //关注信息
        followInfo: localStorage.getItem("fi") ? localStorage.getItem("fi") : [],
    }),
    mutations: {
        //账号信息
        setUser(state, obj) {
            let _obj = JSON.stringify(obj);
            localStorage.setItem("user", _obj);
            state.user = obj;
        },
        removeUser() {
            localStorage.removeItem("user");
        },
        //点赞数量
        setUserGoodNum(state, num) {
            localStorage.setItem("ugn", num);
            state.userGoodNum = num;
        },
        removeUserGoodNum() {
            localStorage.removeItem("ugn");
        },
        //评论信息
        setCollectionInfo(state, obj) {
            let _obj = JSON.stringify(obj);
            localStorage.setItem("ci", _obj);
            state.collectionInfo = obj;
        },
        removeCollectionInfo() {
            localStorage.removeItem("ci");
        },
        //关注信息
        setFollowInfo(state, arr) {
            if (arr != []) {
                let _arr = JSON.stringify(arr);
                localStorage.setItem("fi", _arr)
                state.followInfo = arr;
            }
        },
        removeFollowInfo() {
            localStorage.removeItem("fi");
        }
    }
}