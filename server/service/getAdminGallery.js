import mongoose from 'mongoose'
import qiniu from 'qiniu'
import { qiniu as qiniuSecretConf } from '../conf/userConf'

const BUCKET = qiniuSecretConf.qiniu.bucket
const MAC = new qiniu.auth.digest.Mac(qiniuSecretConf.qiniu.AK, qiniuSecretConf.qiniu.SK)
const QINIU_UPDATE_OPTION = {
	scope: BUCKET,
	returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"name":"$(x:name)","type":"$(mimeType)"}'
}

export const getQiniuToken = () => {
	const putPolicy = new qiniu.rs.PutPolicy(QINIU_UPDATE_OPTION)
	return putPolicy.uploadToken(MAC)
}

const GalleryItem = mongoose.model('galleryModel')

export const saveNewGallery = async (title, author, description) => {
	let query = {
		title, author, description, url: 'http://img.kalecgos.top'
	}
	try {
		let addData = new GalleryItem(query)
		return await addData.save()
	} catch (e) {
		throw e
	}
}

export const savedGallery = async (id, title, author, description) => {
	let query = {
		title, author, description
	}
	try {
		let saveData = await GalleryItem.findByIdAndUpdate(id, query)
		if(saveData) {
			return saveData
		} else {
			throw '相册不存在'
		}
	} catch (e) {
		throw e
	}
}

export const getAllGallery = async (isManage) => {
	try {
		if(isManage) {
			return await GalleryItem
				.find({}, 'title author description url coverImgPath show pv like')
				.sort({
					['meta.updateTime']: -1
				})
		} else {
			// todo 非管理员访问列表
		}
	} catch (e) {
		throw e
	}
}

export const deleteOneGallery = async id => {
	try {
		let data = await GalleryItem.findByIdAndRemove(id)
		if(data) {
			return '相册删除成功'
		} else {
			throw '相册不存在'
		}
	} catch (e) {
		throw e
	}
}

export const updateShowGallery = async (id, show) => {
	try {
		if(show === 1 || show === 0) {
			let data = await GalleryItem.findByIdAndUpdate(id, { show })
			if(data){
				return data.show
			} else {
				throw '相册不存在'
			}
		} else {
			throw '数据格式不正确'
		}
	} catch (e) {
		throw e
	}
}

export const updateImages = async (id, imageList) => {
	let listCheck = imageList.map(item => {
		return {
			imagePath: item.imagePath,
			imageName: item.imageName,
			imageDesc: item.imageDesc
		}
	})
	try {
		let data = await GalleryItem.findById(id)
		if(data) {
			for(let item of listCheck) {
				data.images.push(item)
			}
			await data.save()
		} else {
			throw '相册不存在'
		}
	} catch (e) {
		throw e
	}
}

export const getOneGalleryImages = async (id) => {
	try {
		let data = await GalleryItem.findById(id)
		if(data) {
			return data
		} else {
			throw '相册不存在'
		}
	} catch (e) {
		throw e
	}
}

