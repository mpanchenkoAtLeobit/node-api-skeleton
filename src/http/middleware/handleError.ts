import { NextFunction, Request, Response } from 'express';
import { ConflictError, NotFoundError, BadInputError, UnauthorizedError, ForbiddenError } from '../../utils/errors';
import { ERROR_MESSAGES } from '../../constants/error';
import statusCode from 'http-status-codes';
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
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  const message: IErrorMessage = {
    code: 0,
    message: err.message,
  };
  log.error(message.message, { err, message });

  switch (true) {
    case err instanceof BadInputError:
      sendError(res, message, statusCode.BAD_REQUEST);
      break;
    case err instanceof ConflictError:
      sendError(res, message, statusCode.CONFLICT);
      break;
    case err instanceof NotFoundError:
      sendError(res, message, statusCode.NOT_FOUND);
      break;
    case err instanceof UnauthorizedError:
      sendError(res, message, statusCode.UNAUTHORIZED);
      break;
    case err instanceof ForbiddenError:
      sendError(res, message, statusCode.FORBIDDEN);
      break;
    default:
      sendError(
        res,
        {
          code: 0,
          message: ERROR_MESSAGES.Unknown,
        },
        statusCode.INTERNAL_SERVER_ERROR,
      );
      break;
  }
}

export { handleError };
