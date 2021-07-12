abstract class BaseError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class ForbiddenError extends BaseError {}

export class BadInputError extends BaseError {}

export class ConflictError extends BaseError {}

export class NotFoundError extends BaseError {}

export class UnauthorizedError extends BaseError {}

export class InternalServerError extends BaseError {}
