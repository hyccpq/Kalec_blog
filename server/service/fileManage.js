import { FileManageBase } from './base/fileManageBase.js'
import * as conf from '../conf/userConf.js'
import qiniu from 'qiniu'

export class FileManage extends FileManageBase {
  static #fileManage

  static get instance() {
    if (!this.#fileManage) this.#fileManage = new FileManage()
    return this.#fileManage
  }

  fileListNextMarker

  constructor() {
    super({ accessKey: conf.qiniu.qiniu.AK, secretKey: conf.qiniu.qiniu.SK })
  }

  async getFileList(limit, bucket = 'myupload') {
    try {
      let respBody = await this._qiniuGetPrefixList({ limit: limit }, bucket)
      this.fileListNextMarker = respBody.marker
      let commonPrefixes = respBody.commonPrefixes
      console.log(this.fileListNextMarker)
      console.log(commonPrefixes)
      return respBody.items
    } catch (e) {
      console.log(e)
      throw e
    }
  }

  async deleteListFile(fileNameList = [], bucket = 'image') {
    let deleteOperations = fileNameList.map(item =>
      qiniu.rs.deleteOp(bucket, item)
    )
    try {
      return await this.delListFileSource(deleteOperations)
    } catch (e) {
      console.log(e)
      throw e
    }
  }

  delListFileSource = (deleteOperations = []) =>
    this._qiniuDeleteListFile(deleteOperations)

  _qiniuGetPrefixList = (options, bucket = 'myupload') =>
    new Promise((resolve, reject) => {
      const request = this.networkContentProcessor(resolve, reject)
      this.bucketManager.listPrefix(bucket, options, request)
    })

  _qiniuDeleteListFile = deleteOperations =>
    new Promise((resolve, reject) => {
      const request = this.networkContentProcessor(resolve, reject)
      this.bucketManager.batch(deleteOperations, request)
    })
}
