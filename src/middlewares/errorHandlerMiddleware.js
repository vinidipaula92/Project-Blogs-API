const errorHandlerMiddleware = ({ code, message }, _req, res, _next) => {
  res.status(code || 500).json({ message });
};

module.exports = errorHandlerMiddleware;