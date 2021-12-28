/*
 * @version: 1.0.0
 * @Author: liubofang<421419567@qq.com>
 * @Date: 2020-10-03 23:18:12
 * @LastEditTime: 2020-12-06 14:45:39
 */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
  Request,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import * as log4js from 'log4js';

//拦截器
@Injectable()
export class GlobalInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const applicationLog = log4js.getLogger('application');
    return next.handle().pipe(
      catchError(err => {
        // 输出日志
        applicationLog.error(err);
        // 异常捕获
        throw new HttpException(
          {
            message: err.message,
          },
          HttpStatus.FORBIDDEN,
        );
      }),
    );
  }
}
