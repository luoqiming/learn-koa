// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');

// 创建一个Koa对象表示web app本身:
const app = new Koa();

// 对于任何请求，app将调用该异步函数处理请求：
app.use(async (ctx, next) => {
    // 这里为是那么要 await next？因为koa会将async函数组合成一个处理链，每个async函数都可以做自己的事情，然后通过 await next去调用下一个async函数。
    // 每一个async函数被称为middleware。 那么middleware调用的顺序，就是app.use的顺序。
    // 如果其中的一个middleware没有调用await async 那么剩下的middleware就不会执行，可以据此判断
    await next();
    // ctx是一个由koa封装了nodejs的request和response的变量
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>Hello, koa2!</h1>';
    console.log(ctx.response)
});

// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');