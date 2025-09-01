const errorMiddleware = (err, req, res, next) => {
  try {
    let error = { ...err };
    error.message = err.message;

    if (err.name === "CastError") {
      let message = "Resource not found";
      if (
        String(error.reason).startsWith(
          "BSONError: input must be a 24 character hex string, 12 byte Uint8Array, or an integer"
        )
      )
        message = "O id providenciado é inválido, deve conter 24 carácteres";
      error = new Error(message);
      error.statusCode = 404;
    }

    if (err.code === 11000) {
      const message = "Duplicate field value entered";
      error = new Error(message);
      error.statusCode = 400;
    }

    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((val) => val.message);
      error = new Error(message.join(", "));
      error.statusCode = 400;
    }
    res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || "Internal server error",
    });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
