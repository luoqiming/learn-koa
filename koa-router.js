// 在nodejs的http模块中，我们需要自己进行路由的处理，根据url.parse(request.url).pathname获取请求的路径，然后拼接本地的路径，来让服务器返回相应数据
// koa提供了koa-router来帮助我们实现类似功能，他也是一个middleware，可以处理url映射
const Koa = require('koa');
const router = require('koa-router')();

// 创建一个Koa对象表示web app本身:
const app = new Koa();

// 对于任何请求，app将调用该异步函数处理请求：
app.use(async (ctx, next) => {
    // ctx.request.path变量存储的就是访问的路径
    console.log(`path is:${ctx.request.path}`)
    // 一定要调用next，因为不调用就不会执行下一个app.use()
    await next();
});

// router.get方法用来处理get请求
router.get('/', async (ctx, next) => {
    ctx.response.body = `这里是index页面`
    // ctx.request.query对象中存着get的查询参数
    console.log(ctx.request.query)
})

router.get('/user/:id', async (ctx, next) => {
    // ctx.params来获取动态的路由值
    ctx.response.body = `这里是user界面，动态的id是：${ctx.params.id}`
})

// 由于post请求是作为requset.body发送的，但是nodejs或者koa都无法解析，于是我们需要另外一个中间件koa-bodyparser来解析
const bodyParser = require('koa-bodyparser');

// 然后使用router.post方法获取
router.post('/post', async (ctx, next) => {
    const name = ctx.request.body.name
    const age = ctx.request.body.age
    console.log(name, age)
    if (name === "lqm") {
        ctx.response.body = '对啦！'
    }
    else {
        ctx.response.body = '错啦！'
    }
})


// 注意必须在router之前去在app.use中注册
app.use(bodyParser());

// 在app上注册router.routes()方法
app.use(router.routes());


// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');