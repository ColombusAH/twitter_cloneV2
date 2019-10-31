import { NOT_FOUND, BAD_REQUEST, CONFLICT, FORBIDDEN, INTERNAL_SERVER_ERROR } from 'http-status-codes';

export abstract class HttpError extends Error {
  constructor(public status: number, public message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export class InputValidationError extends HttpError {
  constructor(message: string) {
    super(BAD_REQUEST, message);
  }
}

export class NotFoundError extends HttpError {
  constructor(message: string) {
    super(NOT_FOUND, message);
  }
}

export class BadIdFormatError extends HttpError {
  constructor(messsage: string) {
    super(BAD_REQUEST, messsage);
  }
}

export class UserExistError extends HttpError {
  constructor(messsage: string) {
    super(CONFLICT, messsage);
  }
}

export class NotOwnerError extends HttpError {
  constructor(messsage: string) {
    super(FORBIDDEN, messsage);
  }
}

export class InternalError extends HttpError {
  constructor(messsage: string) {
    super(INTERNAL_SERVER_ERROR, messsage);
  }
}