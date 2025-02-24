import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { DatabaseError } from 'sequelize';

type HttpExceptionResponse = {
  statusCode: number;
  message: string | string[];
  error?: string;
};

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  private getStatus(exception: unknown): number {
    if (exception instanceof HttpException) {
      return exception.getStatus();
    }

    if (exception instanceof DatabaseError) {
      return HttpStatus.BAD_REQUEST;
    }

    return HttpStatus.INTERNAL_SERVER_ERROR;
  }

  private getMessage(exception: unknown): string {
    const errorResponse: HttpExceptionResponse | string =
      exception instanceof HttpException
        ? (exception.getResponse() as HttpExceptionResponse)
        : 'Internal server error';

    if (exception instanceof DatabaseError) {
      return `Database error: ${(exception as DatabaseError).message}`;
    }

    return typeof errorResponse === 'string'
      ? errorResponse
      : Array.isArray(errorResponse.message)
        ? errorResponse.message.join(', ')
        : errorResponse.message;
  }

  private logError(
    exception: unknown,
    status: number,
    message: string,
    request: Request,
  ): void {
    this.logger.error(
      `Error ${status} on ${request.method} ${request.url}`,
      JSON.stringify(
        {
          statusCode: status,
          message,
          path: request.url,
          timestamp: new Date().toISOString(),
        },
        null,
        4,
      ),
      exception instanceof Error ? exception.stack : undefined,
    );
  }

  private buildResponse(status: number, message: string, path: string) {
    return {
      statusCode: status,
      message,
      path,
      timestamp: new Date().toISOString(),
    };
  }

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = this.getStatus(exception);
    const message = this.getMessage(exception);

    this.logError(exception, status, message, request);

    response
      .status(status)
      .json(this.buildResponse(status, message, request.url));
  }
}
