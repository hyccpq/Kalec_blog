import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const Schema = mongoose.Schema
const SALT_WORK_FACTOR = 10
const MAX_LOGIN_ATTEMPS = 5
const LOCK_TIME = 30 * 60 * 1000

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

adminUser.virtual('isLocked').get(function() {
    return this.isLocked && this.isLocked > Date.now()
})

adminUser.pre('save', function(next) {
    if (this.isNew) {
        this.joinTime = this.updateTime = Date.now()
    } else {
        this.updateTime = Date.now()
    }
    next()
})

adminUser.pre('save', function(next) {
    if (!this.isModified('password')) return next();
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(this.password, salt, (error, hash) => {
            if (error) return next(error);
            this.password = hash
            next()
        })
    })
})

adminUser.methods = {
    comparePassword: (_password, password) => {
        return new Promise((resolve, reject) => {
            bcrypt.compare(_password, password, (err, isMatch) => {
                if (!err) resolve(isMatch);
                else reject(err)
            })
        })
    },

    incLoginAttepts: user => {
    	return new Promise((resolve, reject) => {
    		if(this.lockUntil && this.lockUntil < Date.now()) {
				this.update({
					$set: {
						loginAttepts: 1
					},
					$unset: {
						lockUntil: 1
					}
				}, err => {
					if(!err)resolve(true);
					else reject(err)
				})
    		} else {
    			let updateLoginCount = {
    				$inc: {
    					loginAttepts: 1
    				}
    			}
    			if(this.loginAttepts + 1 >= MAX_LOGIN_ATTEMPS && this.isLocked){
    				updateLoginCount.$set = {
    					lockUntil: Date.now() + LOCK_TIME
    				} 
    			}

    			this.update(updateLoginCount, err => {
    				if(!err)resolve(false);
    				else reject(err)
    			})
    		}
    	})
    }
}

mongoose.model('adminUserModel', adminUser);
