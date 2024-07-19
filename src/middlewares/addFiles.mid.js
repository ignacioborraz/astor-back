import __dirname from "../../utils.js";

function addFiles(req, res, next) {
  try {
    if (!req.file) {
      req.body.photos = req.files.map((each) => "/samples/"+each.filename);
      const last = req.body.photos.length - 1;
      req.body.main_photo = req.body.photos[last];
    } else {
      req.body.main_foto = "/samples/"+req.file.filename;
    }
    return next();
  } catch (error) {
    return next(error);
  }
}
export default addFiles;
