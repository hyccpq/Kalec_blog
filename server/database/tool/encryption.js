import bcrypt from "bcrypt";

const SALT_WORK_FACTOR = 10
export const MAX_LOGIN_ATTEMPS = 5
export const LOCK_TIME = 30 * 60 * 1000

export const encryptionPassword = password => new Promise((resolve, reject) => {
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) return reject(err);

        bcrypt.hash(password, salt, (error, hash) => {
            if (error) return reject(error);
            // this.password = hash
            resolve(hash)
        })
    })
})

export const comparePassword = (_password, password) => new Promise((resolve, reject) => {
    bcrypt.compare(_password, password, (err, isMatch) => {
        if (!err) resolve(isMatch);
        else reject(err)
    })
})
