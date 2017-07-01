import * as mongoose from "mongoose"

export interface IUser {
  name: string
  email: string
  password: string
  avatarUrl: string
  gender: boolean
  created_at: number
}

export const UserScheme = new mongoose.Schema({
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
  created_at: Date
})

export const User = mongoose.model("User", UserScheme)
