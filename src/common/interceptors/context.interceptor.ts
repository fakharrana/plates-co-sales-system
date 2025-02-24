import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { tap } from 'rxjs/operators';

@Injectable()
export class ContextInterceptor implements NestInterceptor {
  constructor(private readonly loggerService: Logger) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();

    const method = request.method;

    const url = request.url;

    const startTime = Date.now();

    this.loggerService.debug(`Incoming Request: ${method} ${url}`);

    return next.handle().pipe(
      tap(() => {
        const responseTime = Date.now() - startTime;

        this.loggerService.debug(
          `Completed Request: ${method} ${url} - ${responseTime}ms`,
        );
      }),
    );
  }
}
