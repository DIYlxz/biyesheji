const Koa = require("koa");
const app = new Koa()
const Router = require('koa-router')

const router = new Router()

router.get('/', async (ctx, next) => {
  ctx.body = '你好，我这里是index页'
})

router.get('/user', async (ctx, next) => {
  ctx.body = '你好，我这里是user页'
})

router.get('/error', async (ctx, next) => {
  ctx.body = '你好，我这里是error页'
})

app.use(router.routes())

app.listen(3333, ()=>{
  console.log('server is running at http://localhost:3333')
})