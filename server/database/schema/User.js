import mongoose from 'mongoose'
// import bcrypt from 'bcrypt'
import {comparePassword, encryptionPassword, LOCK_TIME, MAX_LOGIN_ATTEMPS} from "../tool/encryption";

const Schema = mongoose.Schema
// const SALT_WORK_FACTOR = 10

let adminUser = new Schema({
    user: {
        unique: true,
        type: String
    },
    password: {
        unique: true,
        type: String
    },
    email: {
        unique: true,
        type: String
    },
    token: String,
    lockUntil: Number,
    loginAttepts: {
        type: Number,
        default: 0,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    remark: {
        type: String,
        default: '暂无'
    },
    joinTime: {
        type: Date,
        default: Date.now()
    },
    updateTime: {
        type: Date,
        default: Date.now()
    }
});

adminUser.virtual('isLocked').get(function () {
    return this.isLocked && this.isLocked > Date.now()
})

adminUser.pre('save', function (next) {
    if (this.isNew) {
        this.joinTime = this.updateTime = Date.now()
    } else {
        this.updateTime = Date.now()
    }
    next()
})

adminUser.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        let hash = await encryptionPassword(this.password)
        this.password = hash
        next()
    } catch (e) {
        next(e)
    }
})

adminUser.methods = {
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

mongoose.model('adminUserModel', adminUser);
