function errorHandler(error, req, res, next) {
  console.log(error);
  return res.status(error.status || 500).json({
    success: false,
    message: error.message || "API ERROR",
  });
}

export default errorHandler;
