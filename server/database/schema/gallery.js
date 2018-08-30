import mongoose from 'mongoose'

const Schema = mongoose.Schema

let galleryItem = new Schema({
    title:String,
    author: String,
    images:[
        {
            imageName: String,
            imageDesc: String,
	        imagePath: String,
	        show: { type: Number, default: 0 },
	        updateTime: {
            	type: Date,
		        default: Date.now()
	        }
        }
    ],
    description:String,
	url: { type: String, default: '' },
    coverImgPath:{ type: String, default: '' },
    show:{ type: Number, default:0 },
    pv:{ type: Number, default:0 },
    like:{ type: Number, default:0 },
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

mongoose.model('galleryModel', galleryItem)