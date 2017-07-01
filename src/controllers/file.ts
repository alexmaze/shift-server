import { upload } from "../utils/file-upload"
import { newController } from "../utils/controller-factory"
import { getLogger } from "log4js"

const logger = getLogger("FileController")

export const FileController = newController()

FileController.post("/", upload.single("file"), (req, res) => {
  if (req.file) {
    return res.json(req.file)
  } else {
    return res.status(500).end()
  }
})
logger.debug(process.cwd() + "/public/upload")
