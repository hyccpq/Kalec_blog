import mongoose from 'mongoose'

const GalleryItem = mongoose.model('galleryModel')

export const saveNewGallery = async (title, author, description) => {
	let query = {
		title, author, description
	}
	try {
		let addData = new GalleryItem(query)
		return await addData.save()
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

export const updateImages = async (id, imageName, imageDesc, imagePath) => {
	let query = {
		imagePath, imageName, imageDesc
	}
	try {
		let data = await GalleryItem.findById(id)
		if(data) {
			data.images.push(query)
			await data.save()
		} else {
			throw '相册不存在'
		}
	} catch (e) {
		throw e
	}
}

