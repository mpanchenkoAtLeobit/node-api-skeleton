import { NextFunction, Request, Response } from 'express';
import { ConflictError, NotFoundError, BadInputError, UnauthorizedError, ForbiddenError } from '../../utils/errors';
import { ERROR_MESSAGES } from '../../constants/error';
import { BAD_REQUEST, CONFLICT, NOT_FOUND, INTERNAL_SERVER_ERROR, UNAUTHORIZED, FORBIDDEN } from 'http-status-codes';
import { IErrorMessage } from '../../models';
import { log } from '../../services/logService';

function sendError(res: Response, message: IErrorMessage, status: number) {
  res.status(status).send({
    code: message.code,
    message: message.message,
  });
}

function handleError(
  err: ConflictError | NotFoundError | BadInputError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const message: IErrorMessage = {
    code: 0,
    message: err.message,
  };
  log.error(message.message, { err, message });

  switch (true) {
    case err instanceof BadInputError:
      sendError(res, message, BAD_REQUEST);
      break;
    case err instanceof ConflictError:
      sendError(res, message, CONFLICT);
      break;
    case err instanceof NotFoundError:
      sendError(res, message, NOT_FOUND);
      break;
    case err instanceof UnauthorizedError:
      sendError(res, message, UNAUTHORIZED);
      break;
    case err instanceof ForbiddenError:
      sendError(res, message, FORBIDDEN);
      break;
    default:
      sendError(
        res,
        {
          code: 0,
          message: ERROR_MESSAGES.Unknown,
        },
        INTERNAL_SERVER_ERROR,
      );
      break;
  }
}

export { handleError };
