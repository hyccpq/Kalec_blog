import mongoose from 'mongoose'

const Schema = mongoose.Schema

let loginLogs = new Schema({
  user: String,
  ip: String,
  massage: String,
  loginTime: { type: Date, default: Date.now }
})

mongoose.model('loginLogsModel', loginLogs)
