function pathHandler(req, res, next) {
  return res.status(404).json({
    success: false,
    message: `${req.method} ${req.url} not found path`,
  });
}
export default pathHandler;
