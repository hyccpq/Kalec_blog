'use strict';
import mongoose from 'mongoose';
import user from '../conf/userConf'

const DB_URL = 'mongodb://localhost:27017/blog_database';
mongoose.Promise = global.Promise;

export const initSchemas = () => {
	glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(item => {
		console.log(item);
		require(item)
	})
}

export const initAdmin = async () => {
	const User = mongoose.model('User')
	let user = await User.findOne({
		username: 'hyccpq'
	})
	
	if(!user) {
		const user = new User(user)
		
		await user.save()
	}
}

export const connect = () => {
	let maxConnect = 0
	
	return new Promise((resolve, reject) => {
		if(process.env.NODE_ENV !== 'production'){
			mongoose.set('debug', true)
		}
		
		mongoose.connect(DB_URL)
		
		mongoose.connection.on('disconnected', () => {
			maxConnect++
			if(maxConnect < 5) {
				mongoose.connect(DB_URL)
			} else {
				reject()
				throw new Error('数据库连接失败！')
			}
		})
		
		mongoose.connection.on('error', err => {
			maxConnect++
			if(maxConnect < 5){
				mongoose.connect(DB_URL)
			} else {
				reject(err)
				throw new Error('数据库连接异常！')
			}
		})
		
		mongoose.connection.on('open', () => {
			resolve()
			console.log('MongoDB成功连接'.bgGreen)
		})
	})
}
