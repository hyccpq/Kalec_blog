import {request} from "./base";

export {request} from './base'

const GALLERY_BASE = '/gallery/v0/'

const ADD_GALLERY = GALLERY_BASE + 'addGallery'
const EDIT_GALLERY = GALLERY_BASE + 'editGallery'
const GET_ALL_GALLERY = GALLERY_BASE + 'adSearchAllGallery'
const PUT_SHOW_GALLERY = GALLERY_BASE + 'showGallery'
const DELETE_GALLERY = GALLERY_BASE + 'deleteGallery'
const GET_QINIU_TOKEN = GALLERY_BASE + 'getUpdateToken'
const GET_GALLERY_IMAGES_ALL = GALLERY_BASE + 'getGalleryImages'
const POST_GALLERY_IMAGES_LIST = GALLERY_BASE + 'updatedImages'
const OPTION_IMAGES = GALLERY_BASE + 'images'
const SET_COVER = GALLERY_BASE + 'cover'

// export const request = request;

export const getGalleryList = () => {
    return request({
        url: GET_ALL_GALLERY,
        method: 'GET'
    })
}

export const putGalleryShow = (data) => {
    return request({
        url: PUT_SHOW_GALLERY,
        method: 'PUT',
        data
    })
}

export const deleteOneGallery = (id) => {
    return request({
        url: DELETE_GALLERY,
        method: 'DELETE',
        params: {
            id
        }
    })
}

export const addOneGallery = (data) => {
    return request({
        url: ADD_GALLERY,
        method: 'POST',
        data
    })
}

export const editOneGallery = (data) => {
    return request({
        url: EDIT_GALLERY,
        method: 'PUT',
        data
    })
}

export const getQiniuToken = () => {
    return request({
        url: GET_QINIU_TOKEN,
        method: 'GET'
    })
}

export const getGalleryImages = (id) => {
    return request({
        url: GET_GALLERY_IMAGES_ALL,
        method: 'GET',
        params: {
            id
        }
    })
}

export const postGalleryOneImagesList = (id, imageList) => {
    return request({
        url: POST_GALLERY_IMAGES_LIST,
        method: 'POST',
        data: {
            id,
            imageListInf: imageList
        }
    })
}

export const delImages = (id, imageIds) => {
    return request({
        url: OPTION_IMAGES,
        method: 'DELETE',
        params: {
            id, imageIds
        }
    })
}

export const putImages = (id, imageId, {imageDesc, imageName, show}) => {
    let dataItem = {}
    if (imageDesc) dataItem.imageDesc = imageDesc
    if (imageName) dataItem.imageName = imageName
    if (show) dataItem.show = show
    return request({
        url: OPTION_IMAGES,
        method: 'PUT',
        data: {
            id, imageId, ...dataItem
        }
    })
}

export const postCover = (id, imagePath) => {
	return request({
		url: SET_COVER,
		method : 'POST',
		data: {
			id, imagePath
		}
	})
}
