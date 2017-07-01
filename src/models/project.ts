import * as mongoose from "mongoose"
import { IUser } from "./user"

export interface IProject {
  name: string
  author: IUser
  content: string
  created_at: Date
}

export const ProjectScheme = new mongoose.Schema({
  name: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  content: String,
  created_at: Date
})

export const Project = mongoose.model("Project", ProjectScheme)
