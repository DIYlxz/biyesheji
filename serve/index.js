const Koa = require("koa");
const app = new Koa()
const Router = require('koa-router')
//node里面需要require引入
const db = require("./mysqlConnection/index.js")
//获取post要使用第三方插件
const bodyParser = require('koa-bodyparser')

const router = new Router()


router.post('/login', async (ctx, next) => {
  let data = ctx.request.body;
  let sql = `SELECT * FROM user WHERE userName='${data.userName}' AND password='${data.password}'`;
  const result = await db.sqlUser(sql);
  if(result.status == 200) {
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
      //评论数量
      commentNum: result.results.commentNum,
      //收藏数
      collectionNum: result.results.collectionNum,
      //点赞数
      goodNum: result.results.goodNum,
    };
  }else {
    ctx.body = {
      msg: "账号密码错误",
      access: false,
      code: 400,
    }
  }
})


app.use(bodyParser())
app.use(router.routes())
//自动丰富响应头
app.use(router.allowedMethods())

// mysql.endConnection();

app.listen(8010, () => {
  console.log('server is running at http://localhost:8010')
})