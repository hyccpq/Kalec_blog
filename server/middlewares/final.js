export const finalErr = app => {
  app.use(async (ctx, next) => {
    await ctx.render('error.ejs', {
      code: 404,
      info: '错误',
      title: '渲染出现错误',
      jumpUrl: '/'
    })
  })
}
