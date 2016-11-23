import mongoose from 'mongoose'

export let ProjectScheme = new mongoose.Schema({
  name: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: String,
  created: Date
})

export let Project = mongoose.model('Project', ProjectScheme)
