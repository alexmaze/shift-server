import { upload } from "../utils/file-upload"
import { newController } from "../utils/controller-factory"

export const FileController = newController()

FileController.post("/", upload.single("file"), (req, res) => {
  if (req.file) {
    return res.json(req.file)
  } else {
    return res.status(500).end()
  }
})
console.log(process.cwd() + "/public/upload")
