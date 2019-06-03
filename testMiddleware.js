const Koa = require('koa');
const app = new Koa();
const msg = {
    name: "lqm",
    age: 34,
    gender: "male",
    height: 182
}
app.use(async (ctx, next) => {
    console.log('1-1')
    ctx.response.type = 'application/json'
    ctx.response.body = JSON.stringify(msg);
    await next();
    console.log('1-2')
})

app.use(async (ctx, next) => {
    console.log('2-1')
    await next();
    console.log('2-2')

})

app.use(async (ctx, next) => {
    console.log('3-1')
    await next();
    console.log('3-2')

})

app.listen('5678')
// 执行的顺序是：1-1，2-1，3-1，3-2，2-2，1-2