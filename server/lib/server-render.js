export default async (ctx, renderer) => {
    

    const context = { url: ctx.path }

    try {
        ctx.set('Content-Type', 'text/html')

        const appString = await renderer.renderToString(context)
        
        
        const { title } = context.meta.inject()

        await ctx.render('index.ejs', {
            appString,
            style: context.renderStyles(),
            state: context.renderState(),
            javascript: context.renderScripts(),
	        title: title.text()
        })
        
    } catch (error) {
        await ctx.render('error.ejs', {
            code: 404,
            info: error.toString(),
            title: '渲染出现错误',
            jumpUrl: '/'
        })
        console.error('渲染错误',error);   
        throw new Error(error)
    }
}