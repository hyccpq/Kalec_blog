import mongoose from 'mongoose'

const Schema = mongoose.Schema

let loginLogs = new Schema({
	totalViews: {type: Number , default: 0},
    preViews: {type: Number , default: 0},
    dayViewsList: [
        {
            dayViews: {type: Number , default: 0},
            time: { type: Date, default: Date.now }
        }
    ]
})

mongoose.model('loginLogsModel', loginLogs)