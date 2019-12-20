import mongoose from 'mongoose'

const Schema = mongoose.Schema

let tagAndClassic = new Schema({
  classic: [String],
  tag: [
    {
      tagId: {
        type: Number,
        default: 0
      },
      tagName: String
    }
  ]
})

mongoose.model('classicTagModel', tagAndClassic)
