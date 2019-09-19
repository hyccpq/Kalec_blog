import mongoose from "mongoose";

const GalleryItem = mongoose.model('galleryModel')


export const getAllGallery = async () => {

}

export const checkGalleryPassword = async (id, password, ip) => {
	let match = false

	try {
		const galleryItem = await GalleryItem.findById(id)

		if(galleryItem) {
			match = await galleryItem.comparePassword(password, galleryItem.password)
			console.log('密码比对：', match)
		}
		return {
			match,
			galleryItem
		}
	} catch (e) {
		throw e
	}
}
