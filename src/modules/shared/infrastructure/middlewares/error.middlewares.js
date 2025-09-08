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
      ) {
        message = "O id providenciado é inválido, deve conter 24 carácteres";
      }
      error = new Error(message);
      error.statusCode = 400;
    }

    if (err.code === 11000) {
      const message = "Duplicate field value entered";
      error = new Error(message);
      error.statusCode = 409;
    }

    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((val) => val.message);
      error = new Error(message.join(", "));
      error.statusCode = 400;
    }

    const customErrors = {
      CompanyNotFoundError: { code: 404 },
      UserNotFoundError: { code: 404 },
      NotCompanyMemberError: { code: 403 },
      UserAlreadyExistsError: { code: 400 },
      InvitationNotFoundError: { code: 404 },
      InvitationExpiredError: { code: 400 },
      InvitationAlreadyAcceptedError: { code: 400 },
      InvitationCanceledError: { code: 400 },
      InvitationNotDestitationError: { code: 403 },
      TeamNotFoundError: { code: 404 },
      NotTeamMemberError: { code: 403 },
      NotTeamCompanyError: { code: 403 },
      InvalidConfirmCodeError: { code: 400 },
      ExpiredConfirmCodeError: { code: 400 },
      EmailOrPasswordInvalidError: { code: 400 },
      EventNotFoundError: { code: 404 },
      EventTimeConflictError: { code: 409 },
    };
    if (customErrors[err.name]) {
      error.statusCode = customErrors[err.name].code;
    }
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
