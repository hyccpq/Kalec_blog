import mongoose from 'mongoose'
import qiniu from 'qiniu'
import _ from 'lodash'
import {qiniu as qiniuSecretConf} from '../conf/userConf'
import {FileManage} from "./fileManage";

const isArray = c => _.isArray(c) ? c : [c]

const BUCKET = qiniuSecretConf.qiniu.bucket
const MAC = FileManage.instance.mac
const QINIU_UPDATE_OPTION = {
    scope: BUCKET,
    returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"name":"$(x:name)","type":"$(mimeType)"}'
}

export const getQiniuToken = () => {
    const putPolicy = new qiniu.rs.PutPolicy(QINIU_UPDATE_OPTION)
    return putPolicy.uploadToken(MAC)
}

const GalleryItem = mongoose.model('galleryModel')

export const saveNewGallery = async (title, author, description, password, url = 'http://img.kalecgos.top', isPwd = false) => {
    let query = {
        title, author, description, url
    }
    if (password && isPwd) query.password = password
    try {
        let addData = new GalleryItem(query)
        return await addData.save()
    } catch (e) {
        console.error(e)
        throw e
    }
}

export const savedGallery = async (id, title, author, description, password, isPwd = false) => {
    let query = {
        title, author, description
    }

    try {
        let data;
        if (password && isPwd) {
            data = await GalleryItem.findById(id)
            data.password = password
            data.title = title
            data.author = author
            data.description = description
            await data.save()
        } else {
            data = await GalleryItem.findByIdAndUpdate(id, query)
        }
        if (data) return data
        else {
            throw '相册不存在'
        }
    } catch (e) {
        throw e
    }
}

export const getAllGallery = async (isManage, {pageNum = 0, pageSize = 10}) => {
    try {
        if (isManage) {
            let data = await GalleryItem
                .find({}, 'title author description url coverImgPath show pv like meta password')
                .sort({
                    ['meta.updateTime']: -1
                }).lean()
            return data.map((item) => {
                item.isPwd = !!item.password
                delete item.password
                return item
            })
        } else {
            // 非管理员访问列表
            const querys = {show: 1}
            const curPageItemNum = await GalleryItem.find(querys).count()
            const data = await GalleryItem
                .find(querys, 'title author description url coverImgPath show pv like meta')
                .skip(pageNum * pageSize)
                .limit(pageSize)
                .sort({
                    ['meta.updateTime']: -1
                })
            return {
                curItemNum: curPageItemNum,
                galleryList: data,
                curPage: pageNum
            }
        }
    } catch (e) {
        throw e
    }
}

export const deleteOneGallery = async id => {
    try {
        let imageData = await GalleryItem.findById(id);
        if (imageData) {
            if (imageData.images.length) await FileManage.instance.deleteListFile(imageData.images.map(item => item.imagePath), BUCKET);
            await GalleryItem.findByIdAndRemove(id);
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
        if (show === 1 || show === 0) {
            let data = await GalleryItem.findByIdAndUpdate(id, {show})
            if (data) {
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
        if (data) {
            for (let item of listCheck) {
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
        if (data) {
            return data
        } else {
            throw '相册不存在'
        }
    } catch (e) {
        throw e
    }
}

export const setCoverImage = async (id, imagePath) => {
    try {
        let data = await GalleryItem.findByIdAndUpdate(id, {coverImgPath: imagePath})
        if (data) {
            return data
        } else {
            throw '相册不存在'
        }

    } catch (e) {
        throw e
    }
}

export const delSelectImage = async (id, imageId) => {
    let imageIdList = isArray(imageId)
    try {
        let galleryItem = await GalleryItem.findById(id)
        let imagePathList = []

        for (let itemId of imageIdList) {
            let imageInfo = galleryItem.images.id(itemId)
            imagePathList.push(imageInfo.imagePath)
            imageInfo.remove()
        }
        await FileManage.instance.deleteListFile(imagePathList, BUCKET);

        galleryItem.save()
    } catch (e) {
        throw e
    }
}

export const editSelectImage = async (id, imageId, {imageName, imageDesc, show}) => {
    try {
        let galleryItem = await GalleryItem.findById(id)
        let imageInfo = galleryItem.images.id(imageId)
        if (imageName && imageDesc && typeof show === 'undefined') return;
        if (show === 1 || show === 0) {
            if (imageName) imageInfo.imageName = imageName
            if (imageDesc) imageInfo.imageDesc = imageDesc
            if (typeof show !== 'undefined') imageInfo.show = show
            await galleryItem.save()
            return imageInfo;
        } else {
            throw '数据格式不正确'
        }


    } catch (e) {
        throw e
    }
}
