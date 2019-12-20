import mongoose from 'mongoose'
import svgCaptcha from 'svg-captcha'
import { formatDate } from '../lib/util.js'

const articleDatabase = mongoose.model('articleModel')
const tagAndClassicDatabase = mongoose.model('classicTagModel')

const CAPTCHA_CONFIG = {
  size: 4,
  ignoreChars: '0o1i',
  noise: 5
}

export const getArticle = async (skip = 0, params = {}) => {
  let querys = {
    show: 1
  }
  if (params.classic) querys.classic = params.classic
  if (params.tag) querys['tag.tagName'] = params.tag
  try {
    const articleNum = await articleDatabase.find(querys).count()

    // let limit = (skip + 1) * 10 <= articleNum ? 10 : articleNum % 10
    const articleListAllInfo = await articleDatabase
      .find(querys, 'id markNum imgUrl time title abstract')
      .skip(skip * 10)
      .limit(10)
      .sort({
        time: -1
      })

    let articleList = articleListAllInfo.map(item => {
      return {
        id: item._id,
        markNum: item.markNum,
        imgSrc: item.imgUrl,
        time: formatDate(item.time),
        title: item.title,
        intr: item.abstract
      }
    })
    return {
      allArticleList: articleNum,
      articleList,
      currentPage: skip
    }
  } catch (e) {
    throw e
  }
}

export const searchOneArticle = async id => {
  try {
    let oneArticleInfo = await articleDatabase.findById(
      id,
      '-markList.userEmail -markList.replyList.replyEmail'
    )
    if (oneArticleInfo.show === 0) {
      throw '无法找到文章'
    }
    return oneArticleInfo

    // let resData = getReturnArticle(allArticleInfo, false)
  } catch (e) {
    throw e
  }
}

export const getAllTagsAndClassic = async () => {
  try {
    return await tagAndClassicDatabase.findOne()
  } catch (e) {
    throw e
  }
}

export const saveMark = async (id, user, email, content, isManage) => {
  try {
    let articleInfo = await articleDatabase.findById(id)
    articleInfo.markNum += 1
    articleInfo.markList.push({
      userName: user,
      userEmail: email,
      markContent: content,
      isManage
    })
    let addData = new articleDatabase(articleInfo)
    await addData.save()

    let currentMark = articleInfo.markList[articleInfo.markList.length - 1]

    return {
      markTime: currentMark.markTime,
      userName: currentMark.userName,
      markContent: currentMark.markContent,
      _id: currentMark._id,
      replyList: []
    }
  } catch (e) {
    throw e
  }
}

export const saveReply = async (
  id,
  markId,
  user,
  replyUser,
  email,
  content,
  isManage
) => {
  try {
    let articleInfo = await articleDatabase.findById(id)
    let { replyList } = articleInfo.markList.id(markId)
    articleInfo.markNum += 1
    replyList.push({
      replyName: user,
      replyEmail: email,
      replyContent: content,
      replyedUser: replyUser,
      isManage
    })

    let addData = new articleDatabase(articleInfo)
    await addData.save()

    let currentReply = replyList[replyList.length - 1]

    return {
      replyName: currentReply.replyName,
      replyTime: currentReply.replyTime,
      replyContent: currentReply.replyContent,
      _id: currentReply._id
    }
  } catch (e) {
    throw e
  }
}

export const createCaptchas = async () => {
  try {
    return await svgCaptcha.createMathExpr(CAPTCHA_CONFIG)
  } catch (e) {
    throw e
  }
}

// export const getOneTag = async id => {
// 	try {
//
// 	} catch (e) {
// 		console.log(e)
// 	}
// }
