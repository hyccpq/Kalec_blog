import * as types from '../../type';
import * as API from "../../../util/adApi";

export const getAllGallery = async ({commit}) => {
    try {
        let res = await API.getGalleryList()
        commit(types.GET_GALLERY, res)
    } catch (e) {
        console.log(e);
    }
}

export const putGalleryShow = async ({commit}, {id, show, index}) => {
    try {
        await API.putGalleryShow({id, show})
        commit(types.PUT_GALLERY_SHOW, {show, index})
    } catch (e) {
        console.log(e);
    }
}

export const delGallery = async ({commit}, {id, index}) => {
    try {
        await API.deleteOneGallery(id)
        commit(types.DELETE_ONE_GALLERY, index)
    } catch (e) {
        console.log(e);
    }
}

export const getQiniuUpdateToken = async ({commit}) => {
    try {
        let data = await API.getQiniuToken()
        commit(types.GET_QINIU_UPDATE_TOKEN, data)
    } catch (e) {
        console.log(e);
    }
}

export const postImagesList = async ({commit}, {id, imageList}) => {
    try {
        await API.postGalleryOneImagesList(id, imageList)
        commit(types.POST_IMAGES_LIST, imageList)
    } catch (e) {
        console.log(e);
    }
}

export const getImageList = async ({commit}, id) => {
    try {
        let data = await API.getGalleryImages(id)
        commit(types.GET_IMAGES_LIST_ALL, data)
    } catch (e) {
        console.log(e);
    }
}

export const putImageConf = async ({commit, dispatch}, {cb, id, imageId, imageDesc, imageName, show}) => {
    try {
        await API.putImages(id, imageId, cb, {imageDesc, imageName, show})
        dispatch('getImageList', id)
    } catch (e) {
        console.log(e);
    }
}

export const setCover = async ({commit}, {id, imageName, cb}) => {
    try {
        await API.postCover(cb, id, imageName)
    } catch (e) {
        console.log(e);
    }
}

export const delImageConf = async ({commit, dispatch}, {cb, id, imageIds}) => {
    try {
        await API.delImages(cb, id, imageIds)
        dispatch('getImageList', id)
    } catch (e) {
        console.log(e);
    }
}
