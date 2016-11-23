import mongoose from 'mongoose'

export let UserScheme = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    unique: true,
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  avatarUrl: String,
  gender: Boolean,
  created: Date
})

export let User = mongoose.model('User', UserScheme)
