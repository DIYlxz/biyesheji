let mysql = require("mysql");

let connection = mysql.createConnection({
    host: "47.107.88.192",
    user: "root",
    password: "root_password",
    database: "bishe",
});

//连接数据库
connection.connect();

function sqlUser(sql) {
    return new Promise((resolve, reject) => {
        connection.query(sql, function (err, result) {
            if (err) {
                reject(err);
            }
            if (result.length == 1) {
                resolve({
                    status: 200,
                    results: result[0],
                })
            }else {
                resolve({
                    status: 400,
                })
            }
        });
    });
}

function endConnection() {
    connection.end();
}

module.exports = {
    //登录查询用户名
    sqlUser,
    //结束连接
    endConnection,
}