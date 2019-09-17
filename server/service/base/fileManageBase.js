import qiniu from 'qiniu'

export class FileManageBase {
    bucketManager;

    constructor({accessKey, secretKey,}) {
        this._config = new qiniu.conf.Config();
        this._config.zone = qiniu.zone.Zone_z0;
        const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
        this.bucketManager = new qiniu.rs.BucketManager(mac, this._config);
    }
}
