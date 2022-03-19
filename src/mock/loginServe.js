import Mock from 'mockjs'

const userObj = [{
    userName: "dzz",
    password: "123456789",
    headPortrait: "../../assets/images/LoginImg/01.jpg",
    infoName: "林轩之",
    //1开头为男
    dyNumber: "100001",
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
                infoName: userObj[i].infoName,
                dyNumber: userObj[i].dyNumber,
            }
        }
    }
    return {
        msg: "账号密码错误"
    }
});