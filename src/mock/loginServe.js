import Mock from 'mockjs'

const userObj = [{
    userName: "dzz",
    password: "123456789",
    headPortrait: "../../assets/images/LoginImg/01.jpg"
}];

Mock.mock("/api/login", "post", (data)=>{
    let _data = JSON.parse(data.body);
    let _len = userObj.length;
    for(let i=0; i<_len; i++) {
        if(_data.userName === userObj[i].userName && _data.password === userObj[i].password) {
            return {
                msg: "账号密码正确",
                headPortrait: userObj[i].headPortrait,
                access: true,
            }
        }
    }
    return {
        msg: "账号密码错误"
    }
});