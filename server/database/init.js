// 'use strict';
import mongoose from 'mongoose'
import glob from 'glob'
import { resolve } from 'path'
import { userInfo } from '../conf/userConf.js'
import { getDirname } from '../lib/file.js'

const DB_URL = 'mongodb://localhost:27017/blog_database'
mongoose.Promise = global.Promise

export const initSchemas = async () => {
  const modelCtx = glob.sync(
    resolve(getDirname(import.meta).__dirname, './schema', '**/*.js')
  )
  // .forEach(s => import(s))
  try {
    for (const iter of modelCtx) {
      await import(iter)
    }
  } catch (e) {
    console.error(e)
  }
}

export const initAdmin = async () => {
  const User = mongoose.model('adminUserModel')
  let user = await User.findOne({
    user: userInfo.user
  })

  if (!user) {
    const user = new User(userInfo)

    await user.save()
  }
}

export const initClassicAndTags = async () => {
  const ArticleModel = mongoose.model('articleModel')

  let classicTags = await ArticleModel.find({}, 'tag classic')

  const ClassicAndTagModel = mongoose.model('classicTagModel')
  let classicAndTag = await ClassicAndTagModel.find()
  let newTag = []
  // let tagId = []
  let classic = []
  if (!classicAndTag.length) {
    classicTags.forEach(item => {
      if (item.classic && classic.indexOf(item.classic) === -1) {
        classic.push(item.classic)
      }
      item.tag.forEach(tag => {
        let flag = true
        for (let i = 0; i < newTag.length; i++) {
          if (tag.tagId === newTag[i].tagId) {
            flag = false
          }
        }
        if (flag) newTag.push(tag)
      })
    })
    const classicAndTagInfo = new ClassicAndTagModel({
      classic,
      tag: newTag
    })

    await classicAndTagInfo.save()
  }
}

export const connect = () => {
  let maxConnect = 0

  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV !== 'production') {
      mongoose.set('debug', true)
    }

    mongoose.connect(DB_URL)

    mongoose.connection.on('disconnected', () => {
      maxConnect++
      if (maxConnect < 5) {
        mongoose.connect(DB_URL)
      } else {
        reject()
        throw new Error('数据库连接失败！')
      }
    })

    mongoose.connection.on('error', err => {
      maxConnect++
      if (maxConnect < 5) {
        mongoose.connect(DB_URL)
      } else {
        reject(err)
        throw new Error('数据库连接异常！')
      }
    })

    mongoose.connection.on('open', () => {
      console.log('MongoDB成功连接'.bgGreen)
      resolve()
    })
  })
}
