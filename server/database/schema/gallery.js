import mongoose from 'mongoose'
import {comparePassword, encryptionPassword, LOCK_TIME, MAX_LOGIN_ATTEMPS} from "../tool/encryption";

const Schema = mongoose.Schema

let galleryItem = new Schema({
    title: String,
    author: String,
    images: [
        {
            imageName: String,
            imageDesc: String,
            imagePath: String,
            show: {type: Number, default: 0},
            updateTime: {
                type: Date,
                default: Date.now()
            }
        }
    ],
    description: String,
    lockUntil: Number,
    loginAttepts: {
        type: Number,
        default: 0,
        required: true
    },
    password: {type: String, default: ''},
    url: {type: String, default: ''},
    coverImgPath: {type: String, default: ''},
    show: {type: Number, default: 0},
    pv: {type: Number, default: 0},
    like: {type: Number, default: 0},
    meta: {
        createdTime: {
            type: Date,
            default: Date.now()
        },
        updateTime: {
            type: Date,
            default: Date.now()
        }
    }
})


galleryItem.virtual('isLocked').get(function () {
    return this.isLocked && this.isLocked > Date.now()
})

galleryItem.pre('save', function (next) {
    if (this.isNew) {
        this.meta.joinTime = this.meta.updateTime = Date.now()
    } else {
        this.meta.updateTime = Date.now()
    }
    next()
})

galleryItem.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        let hash = await encryptionPassword(this.password)
        this.password = hash
        next()
    } catch (e) {
        next(e)
    }
})

// galleryItem.pre('find', function(next) {
//     console.log(this instanceof mongoose.Query);
//     console.warn(JSON.stringify(this))
//     if(!this.getQuery().password) return next();
//     this.isPsd = !!this.password;
//     next();
// })

galleryItem.methods = {
    comparePassword,

    incLoginAttepts: user => {
        return new Promise((resolve, reject) => {
            if (this.lockUntil && this.lockUntil < Date.now()) {
                this.update({
                    $set: {
                        loginAttepts: 1
                    },
                    $unset: {
                        lockUntil: 1
                    }
                }, err => {
                    if (!err) resolve(true);
                    else reject(err)
                })
            } else {
                let updateLoginCount = {
                    $inc: {
                        loginAttepts: 1
                    }
                }
                if (this.loginAttepts + 1 >= MAX_LOGIN_ATTEMPS && this.isLocked) {
                    updateLoginCount.$set = {
                        lockUntil: Date.now() + LOCK_TIME
                    }
                }

                this.update(updateLoginCount, err => {
                    if (!err) resolve(false);
                    else reject(err)
                })
            }
        })
    }
}


mongoose.model('galleryModel', galleryItem)
