function mainData(req, res, next) {
  try {
    let messages = "";
    if (!req.body.section) {
      messages += "<p>SECCIÓN REQUERIDA</p>";
    }
    if (!req.body.title) {
      messages += "<p>TÍTULO REQUERIDO</p>";
    }
    if (req.files.length === 0) {
      messages += "<p>FOTOS REQUERIDAS</p>";
    }
    if (messages) {
      const error = new Error(messages);
      error.status = 400;
      throw error;
    }
    if (!req.body.date) {
      req.body.date = new Date();
    }
    return next();
  } catch (error) {
    return next(error);
  }
}
export default mainData;
