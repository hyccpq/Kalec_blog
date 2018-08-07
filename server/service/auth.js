import jwt from 'jsonwebtoken'

const secret = 'yyyyyy'

export const verify = async (ctx, next) => {
	const token = ctx.get('Authorization');

    if (token === '') {
    	ctx.body = {
    		success: false
	    }
        ctx.throw(401, "没有token,请登录访问")
    }
    let tokenContent;
    try {
        tokenContent = await jwt.verify(token, secret);     //如果token过期或验证失败，将抛出错误
	    await next()
    } catch (err) {
    	ctx.body = {
    		success: false
	    }
        ctx.throw(401, 'token失效');
    }
    
}

export const getToken = username => jwt.sign({
	username
}, secret, {
	expiresIn: '12h'
})