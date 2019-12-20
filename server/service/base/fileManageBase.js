import qiniu from 'qiniu'

export class FileManageBase {
  bucketManager
  _mac

  constructor({ accessKey, secretKey }) {
    this._config = new qiniu.conf.Config()
    this._config.zone = qiniu.zone.Zone_z0
    this._mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
    this.bucketManager = new qiniu.rs.BucketManager(this._mac, this._config)
  }

  get mac() {
    return this._mac
  }

  networkContentProcessor = (successCb, errCb) => (err, respBody, respInfo) => {
    if (err) errCb(err)
    else if (respInfo.statusCode !== 200) errCb(respInfo.code)
    else successCb(respBody)
  }
}
