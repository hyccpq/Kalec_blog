import mongoose from 'mongoose'
import { formatDate } from '../lib/util'

const User = mongoose.model('adminUserModel')
const LoginLogs = mongoose.model('siteReadingModel')

export const checkPassword = async (user, password, ip) => {
	let match = false
	
	try {
		const userInfo = await User.findOne({ user })
		
		if(userInfo) {
			match = await userInfo.comparePassword(password, userInfo.password)
			console.log('密码比对：', match)
			
			let loginLogs = new LoginLogs({
				user,
				ip,
				data: '登录系统'
			})
			await loginLogs.save()
		}
		return {
			match,
			userInfo
		}
	} catch (e) {
		throw e
	}
}