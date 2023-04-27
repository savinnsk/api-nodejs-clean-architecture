import { HttpResponse } from "../../protocols/http";
import { ServerError } from "../../errors";
import { Unauthorized } from "../../errors/unauthorized-error";

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error,
});

export const forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: error,
});

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack),
});

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new Unauthorized(),
});

export const ok = (data): HttpResponse => ({
  statusCode: 200,
  body: data,
});

export const noContent = (): HttpResponse => ({
  statusCode: 200,
  body: null,
});
