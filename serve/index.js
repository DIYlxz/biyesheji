const Koa = require("koa");
const app = new Koa()
const Router = require('koa-router')
//node里面需要require引入
const db = require("./mysqlConnection/index.js")
//获取post要使用第三方插件
const bodyParser = require('koa-bodyparser')
//静态资源获取
const serve = require('koa-static');
//路径获取
const path = require("path");
//解析文件
const multer = require("koa-multer");
//文件模块
const fs = require("fs");

const router = new Router();

//上传文件存放路径
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '/static/video'))
  },
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}`)
  }
})
const upload = multer({storage});

//跨域问题
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (ctx.method == 'OPTIONS') {
    ctx.body = 200;
  } else {
    await next();
  }
});
//登录请求
router.post('/login', async (ctx, next) => {
  let data = ctx.request.body;
  let sql = `SELECT * FROM user WHERE userName='${data.userName}' AND password='${data.password}'`;
  const result = await db.sqlUser(sql);
  if (result.status == 200) {
    ctx.body = {
      code: 200,
      access: true,
      infoName: result.results.infoName,
      userName: result.results.userName,
      dyNumber: result.results.dyNumber,
      //作品数量
      worksNum: result.results.worksNum,
      //粉丝数量
      fansNum: result.results.fansNum,
      //关注数量
      followNums: result.results.followNums,
      //喜欢数量
      loveNum: result.results.loveNum,
      //收藏数
      collectionNum: result.results.collectionNum,
      //点赞数
      goodNum: result.results.goodNum,
      //头像地址
      headPortrait: result.results.headPortrait,
    };
  } else {
    ctx.body = {
      msg: "账号密码错误",
      access: false,
      code: 400,
    }
  }
})

//视频资源请求
router.get("/videoData", async (ctx, next) => {
  let sql = `SELECT * FROM videoInfo`;
  const result = await db.videoData(sql);
  if (result.status == 200) {
    ctx.body = {
      code: 200,
      info: result.results,
      commentArr: result.commentArr,
    }
  } else {
    ctx.body = {
      msg: "没有视频",
      code: 400,
    }
  }
})

//评论资源请求
router.post("/curComment", async (ctx, next) => {
  let data = ctx.request.body;
  let sql = `SELECT * FROM comment WHERE videoId='${data.videoId}'`
  const result = await db.commentData(sql, data.videoId);
  if (result.status == 200) {
    ctx.body = {
      code: 200,
    }
  } else {
    ctx.body = {
      msg: "没有评论",
      code: 400,
    }
  }
})

//添加评论请求
router.post("/addComment", async (ctx, next) => {
  let data = ctx.request.body;
  let sql = `INSERT INTO comment(dyNumber,videoId,cmtTalkAbout,cmtGoodNum,cmtReply,cmtPrePeople,infoName) VALUES("${data.dyNumber}","${data.videoId}","${data.cmtTalkAbout}","${data.cmtGoodNum}","${data.cmtReply}","${data.cmtPrePeople}","${data.infoName}")`;
  const result = await db.addComment(sql);
  if (result.status == 200) {
    ctx.body = {
      code: 200,
      msg: "成功录入",
    }
  } else {
    ctx.body = {
      msg: "录入失败",
      code: 400,
    }
  }
})

//增加点赞请求
router.post("/addGood", async (ctx, next) => {
  let data = ctx.request.body;
  let sql = `SELECT goodNum FROM videoInfo WHERE videoId="${data.videoId}"`;
  const result = await db.addGoodNum(sql, data.videoId, data.dyNumber);
  if (result.status == 200) {
    ctx.body = {
      code: 200,
      msg: "成功录入",
    }
  } else {
    ctx.body = {
      msg: "录入失败",
      code: 400,
    }
  }
})

//增加收藏请求
router.post("/addCollection", async (ctx, next) => {
  let data = ctx.request.body;
  let sql = `SELECT collectionNum FROM videoInfo WHERE videoId="${data.videoId}"`;
  const result = await db.addCollectionNum(sql, data.videoId, data.dyNumber);
  if (result.status == 200) {
    ctx.body = {
      code: 200,
      msg: "成功录入",
    }
  } else {
    ctx.body = {
      msg: "录入失败",
      code: 400,
    }
  }
})

//获取喜爱数量
router.post("/getGoodNum", async (ctx, next) => {
  let data = ctx.request.body;
  let sql = `SELECT * FROM loveVideo WHERE dyNumber="${data.dyNumber}"`;
  const result = await db.sendLoveNum(sql);
  if (result.status == 200) {
    ctx.body = {
      code: 200,
      msg: "成功获取点赞",
      loveNum: result.loveNum,
    }
  } else {
    ctx.body = {
      msg: "获取点赞错误",
      code: 400,
    }
  }
})

//获取收藏信息
router.post("/getUserCollection", async (ctx, next) => {
  let data = ctx.request.body;
  let sql = `SELECT * FROM collectionVideo WHERE dyNumber="${data.dyNumber}"`;
  let result = await db.getCollectionInfo(sql);
  if (result.status == 200) {
    ctx.body = {
      code: 200,
      msg: "成功获取",
      info: result.info,
      len: result.info.length,
    }
  } else {
    ctx.body = {
      msg: "获取错误",
      code: 400,
    }
  }
})

//视频上传
router.post("/uploadVideo", upload.single("file"), async (ctx, next) => {
  ctx.body = {
    code: 200,
  }
})

app.use(bodyParser());
app.use(serve(path.join(__dirname) + "/static"));
app.use(router.routes());
//自动丰富响应头
app.use(router.allowedMethods());

// mysql.endConnection();

app.listen(8010, () => {
  console.log('server is running at http://localhost:8010')
})