
let mysql = require("mysql");

let connection = mysql.createConnection({
    host: "47.107.88.192",
    user: "root",
    password: "root_password",
    database: "bishe",
});

//连接数据库
connection.connect();
//登录请求
function sqlUser(sql) {
    return new Promise((resolve, reject) => {
        connection.query(sql, function (err, result) {
            if (err) {
                reject(err);
            }
            if (result.length != 0) {
                resolve({
                    status: 200,
                    results: result[0],
                })
            } else {
                resolve({
                    status: 400,
                })
            }
        });
    });
}
//视频信息:获取视频然后获取评论
function videoData(sql) {
    return new Promise((resolve, reject) => {
        connection.query(sql, function (err, result) {
            if (err) {
                reject(err);
            }
            if (result.length != 0) {
                //获取评论数组
                let sql2 = `SELECT * FROM comment`;
                connection.query(sql2, function (err, result2) {
                    if (err) {
                        reject(err);
                    }
                    if (result2) {
                        resolve({
                            status: 200,
                            results: result,
                            commentArr: result2,
                        })
                    }
                })
            } else {
                resolve({
                    status: 400,
                })
            }
        });
    });
}
//评论信息获取
function commentData(sql, videoId) {
    return new Promise((resolve, reject) => {
        connection.query(sql, function (err, result) {
            if (err) {
                reject(err);
            }
            if (result.length != 0) {
                let len = result.length;
                let sql2 = `UPDATE videoInfo SET commentNum="${len}" WHERE videoId="${videoId}"`;
                connection.query(sql2, function (err, result) {
                    if (err) {
                        reject(err);
                    }
                });
                resolve({
                    status: 200,
                    results: result,
                });
            } else {
                resolve({
                    status: 400,
                })
            }
        });
    });
}

//插入评论信息
function addComment(sql) {
    return new Promise((resolve, reject) => {
        connection.query(sql, function (err, result) {
            if (err) {
                reject(err);
            }
            resolve({
                status: 200,
            });
        });
    });
}

//点赞增加
function addGoodNum(sql, videoId, dyNumber) {
    return new Promise((resolve, reject) => {
        connection.query(sql, function (err, result) {
            if (err) {
                reject(err);
            }
            if (result.length != 0) {
                let dn = (+result[0].goodNum) + 1;
                let sql2 = `UPDATE videoInfo SET goodNum="${dn}" WHERE videoId="${videoId}"`;
                connection.query(sql2, function (err, result) {
                    if (err) {
                        reject(err);
                    }
                });
                let sql3 = `SELECT dyNumber FROM loveVideo WHERE videoId="${videoId}"`;
                connection.query(sql3, function (err, result) {
                    if (err) {
                        reject(err);
                    }
                    if (result) {
                        for (let i = 0; i < result.length; i++) {
                            if (result[i].dyNumber == dyNumber) {
                                return;
                            }
                        }
                        let sql4 = `INSERT INTO loveVideo(dyNumber, videoId) VALUES("${dyNumber}","${videoId}")`;
                        connection.query(sql4, function (err, result) {
                            if (err) {
                                reject(err);
                            }
                        })
                    }
                })
                resolve({
                    status: 200,
                });
            } else {
                resolve({
                    status: 400,
                })
            }
        });
    });
}

//收藏增加
function addCollectionNum(sql, videoId, dyNumber) {
    return new Promise((resolve, reject) => {
        connection.query(sql, function (err, result) {
            if (err) {
                reject(err);
            }
            if (result.length != 0) {
                let cn = (+result[0].collectionNum) + 1;
                let sql2 = `UPDATE videoInfo SET collectionNum="${cn}" WHERE videoId="${videoId}"`;
                connection.query(sql2, function (err, result) {
                    if (err) {
                        reject(err);
                    }
                });
                //检测收藏是否存在
                let sql3 = `SELECT dyNumber FROM collectionVideo WHERE videoId="${videoId}"`;
                connection.query(sql3, function (err, result) {
                    if (err) {
                        reject(err);
                    }
                    if (result) {
                        for (let i = 0; i < result.length; i++) {
                            if (result[i].dyNumber == dyNumber) {
                                return;
                            }
                        }
                        let sql4 = `INSERT INTO collectionVideo(dyNumber, videoId) VALUES("${dyNumber}","${videoId}")`;
                        connection.query(sql4, function (err, result) {
                            if (err) {
                                reject(err);
                            }
                        })
                    }
                })
                resolve({
                    status: 200,
                });
            } else {
                resolve({
                    status: 400,
                })
            }
        });
    });
}

//获取喜爱数量
function sendLoveNum(sql) {
    return new Promise((resolve, reject) => {
        connection.query(sql, function (err, result) {
            if (err) {
                reject(err);
            }
            if (result.length != 0) {
                resolve({
                    status: 200,
                    loveNum: result.length,
                })
            } else {
                resolve({
                    status: 400,
                })
            }
        });
    });
}

//获取收藏信息
function getCollectionInfo(sql) {
    return new Promise((resolve, reject) => {
        connection.query(sql, function (err, result) {
            if (err) {
                reject(err);
            }
            if (result.length != 0) {
                resolve({
                    status: 200,
                    info: result,
                    len: result.length,
                })
            } else {
                resolve({
                    status: 400,
                })
            }
        });
    });
}

//上传地址存储
function uploadVideoUrl(sql, dyNumber) {
    return new Promise((resolve, reject) => {
        connection.query(sql, function (err, result) {
            if (err) {
                reject(err);
            }
            if (result.length != 0) {
                let sql2 = `SELECT worksNum FROM user WHERE dyNumber="${dyNumber}"`;
                connection.query(sql2, function (err, result) {
                    if (err) {
                        reject(err);
                    }
                    let initWorksNum = result[0].worksNum;
                    let len = +(initWorksNum) + 1;
                    let sql3 = `UPDATE user SET worksNum="${len}" WHERE dyNumber="${dyNumber}"`;
                    connection.query(sql3, function (err, result) {
                        if (err) {
                            reject(err);
                        }
                    })
                })
                if (result.length != 0) {
                    resolve({
                        status: 200,
                    })
                } else {
                    resolve({
                        status: 400,
                    })
                }
            }
        });
    });
}

//粉丝信息获取
function fansInfo(sql) {
    return new Promise((resolve, reject) => {
        connection.query(sql, function (err, result) {
            if (err) {
                reject(err);
            }
            if (result.length != 0) {
                resolve({
                    status: 200,
                    info: result,
                    len: result.length,
                })
            } else {
                resolve({
                    status: 400,
                })
            }
        });
    });
}

//关注人员获取
function followsPeo(sql) {
    return new Promise((resolve, reject) => {
        connection.query(sql, function(err, result) {
            if(err) {
                reject(err);
            }
            if(result.length != 0) {
                let len = result.length;
                let arr = [];
                for(let i=0; i<len; i++) {
                    if(result[i].dyNumber != result[i].loveDyNumber) {
                        arr.push(result[i].loveDyNumber);
                    }
                }
                resolve({
                    status: 200,
                    info: arr,
                    len: arr.length,
                })
            }else {
                resolve({
                    status: 400,
                })
            }
        })
    })
}

//增加关注
function addFollow(sql) {
    return new Promise((resolve, reject) => {
        connection.query(sql, function(err, result) {
            if(err) {
                reject(err);
            }
            if(result) {
                resolve({
                    status: 200,
                });
            }else {
                resolve({
                    status: 400,
                });
            }
        })
    })
}

//更新关注
function updateFollow(sql, dyNumber, loveDyNumber) {
    return new Promise((resolve, reject) => {
        connection.query(sql, function(err, result) {
            if(err) {
                reject(err);
            }
            if(result) {
                let len = result.length;
                let sql2 = `UPDATE user SET followNum="${len}" WHERE dyNumber="${dyNumber}"`;
                connection.query(sql2, function(err, result) {
                    if(err) {
                        reject(err);
                    }
                })
                let sql3 = `SELECT * FROM loveUser WHERE loveDyNumber="${loveDyNumber}"`;
                connection.query(sql3, function(err, result) {
                    if(err) {
                        reject(err);
                    }
                    let len1 = result.length;
                    let sql4 = `UPDATE user SET fansNum="${len1}" WHERE dyNumber="${loveDyNumber}"`;
                    connection.query(sql4, function(err, result) {
                        if(err) {
                            reject(err);
                        }
                        resolve({
                            status: 200,
                        });
                    })
                })
            }else {
                resolve({
                    status: 400,
                });
            }
        })
    })
}

function endConnection() {
    connection.end();
}

module.exports = {
    //登录查询用户名
    sqlUser,
    //结束连接
    endConnection,
    //视频信息
    videoData,
    commentData,
    //插入评论信息
    addComment,
    //点赞增添
    addGoodNum,
    //收藏增添
    addCollectionNum,
    //获取点赞数量
    sendLoveNum,
    //获取收藏信息
    getCollectionInfo,
    //上传地址存储
    uploadVideoUrl,
    //粉丝信息获取
    fansInfo,
    //关注人
    followsPeo,
    //增加关注
    addFollow,
    //更新关注
    updateFollow,
}