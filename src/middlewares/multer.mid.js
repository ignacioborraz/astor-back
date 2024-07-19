import multer from "multer";
import __dirname from "../../utils.js";
import { randomBytes } from "crypto";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, __dirname + "/public/samples"),
  filename: (req, file, cb) => {
    const title =
      randomBytes(12).toString("hex") +
      file.originalname.split(" ").join("").toLowerCase();
    return cb(null, title);
  },
});

const uploader = multer({ storage });
export default uploader;
