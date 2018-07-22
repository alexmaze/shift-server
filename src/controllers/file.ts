import { upload } from "../utils/file-upload"
import { newController } from "../utils/controller-factory"
import { Logger } from "../utils/logger"

const logger = Logger("FileController")

export const FileController = newController()

FileController.post("/", upload.single("file"), (req, res) => {
  if (req.file) {
    return res.json(req.file)
  } else {
    return res.status(500).end()
  }
})
logger.debug(process.cwd() + "/public/upload")
