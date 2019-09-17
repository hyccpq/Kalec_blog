import {FileManageBase} from "./base/fileManageBase";
import {qiniu} from "../conf/userConf";

export class FileManage extends FileManageBase {
    fileListNextMarker;

    constructor() {
        super({accessKey: qiniu.qiniu.AK, secretKey: qiniu.qiniu.SK});
    }

    async getFileList(limit, bucket = 'myupload') {
        try {
            let respBody = await this._qiniuGetPrefixList({limit: limit}, bucket);
            this.fileListNextMarker = respBody.marker;
            let commonPrefixes = respBody.commonPrefixes;
            console.log(this.fileListNextMarker);
            console.log(commonPrefixes);
            return respBody.items;
        } catch (e) {
            console.log(e);
            throw e;
        }

    }

    _qiniuGetPrefixList = (options, bucket = 'myupload') => new Promise((resolve, reject) => {
        this.bucketManager.listPrefix(bucket, options, (err, respBody, respInfo) => {
            if (err) reject(err);
            else if (respInfo.statusCode !== 200) reject(respInfo.code);
            else resolve(respBody);
        });
    })
}

