/*
 * @version: 1.0.0
 * @Author: liubofang<421419567@qq.com>
 * @Date: 2020-10-03 23:18:12
 * @LastEditTime: 2020-12-07 18:04:14
 */
import {
  Controller,
  Get,
  Render,
  Req,
  Res,
  Next,
  Param,
  UseGuards,
  UseInterceptors,
  Query,
  Session,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { ApiQuery,ApiOperation } from '@nestjs/swagger';

import { AppService } from './app.service';
import { TestGuard } from './common/guards/test.guards';
import { TestInterceptor } from './common/interceptors/test.interceptor';

import { Roles } from './common/decorator/roles.decorator';
import { RolesGuard } from './common/guards/roles.guards';
import { Liubf } from './common/decorator/liubf.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Hello World' })
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('ejs')
  @ApiOperation({ summary: 'ejs示例' })
  @ApiOperation({ summary: 'Api 模板页' })
  @Render('test.ejs') // 模板注解
  getEjs(): Object {
    return { name: '刘博方' }; // 往模板注入变量
  }

  @Get('api')
  @ApiOperation({ summary: 'ejs渲染API模板页' })
  @Render('index.ejs') // 模板注解
  getIndex(): Object {
    return { msg: 'Welcome To NestJS! My name is liubf.' }; // 往模板注入变量
  }

  // 使用守卫(自定义守卫)
  @UseGuards(TestGuard)
  @ApiOperation({ summary: '使用守卫(自定义守卫)' })
  @Get('guards/:num') // 只有参数num是偶数时 才通过守卫
  guards(@Param('num') num: number): number {
    return num;
  }

  // 使用守卫(自定义角色守卫)
  @Roles('admin') // 采用自定义装饰器
  @UseGuards(RolesGuard) // 自定义角色守卫
  @ApiOperation({ summary: '采用自定义装饰器+自定义守卫' })
  @ApiQuery({
    name: 'user',
    example: 'admin',
  })
  @Get('guardsRoles')
  guardsRoles(@Query('user') user: any): any {
    return '通过角色认证';
  }

  // 使用拦截器(自定义拦截器)
  @UseInterceptors(TestInterceptor)
  @ApiOperation({ summary: '使用拦截器(自定义拦截器)' })
  @Get('interceptors/:num')
  interceptors(@Param('num') num: number) {
    return '这是一个普通的拦截器';
  }

  // 使用装饰器(自定义装饰器)
  @Get('liubf')
  @ApiOperation({ summary: '使用装饰器(自定义装饰器)' })
  liubf(@Liubf('刘博方') liubf: string) {
    return liubf;
  }

  @Get('setSession')
  @ApiOperation({ summary: '设置session' })
  setSession(@Query('name') name: String,@Session() session: any, @Req() req: Request, @Res() res: Response) {
    session.name = name; // 设置session
    res.send('session set success!');
  }

  // 获取session
  @Get('getSession')
  @ApiOperation({ summary: '获取session' })
  session(@Session() session): string {
    return session.name || 'session is undefined';
  }

  @Get('setCookie')
  @ApiOperation({ summary: '设置cookie' })
  setCookie(@Query('name') name: String, @Res() res: Response) {
    res.cookie('name', name, {
      // 更多参数参考官网 https://github.com/expressjs/cookie-parser
      maxAge: 60 * 1000 * 30, // 过期时间 毫秒 这里设置30分钟
      httpOnly: false, // 是否允许客户端使用cookie
    });
    res.send('cookie set success!');
  }

  @Get('getCookie')
  @ApiOperation({ summary: '获取cookie' })
  getCookie(@Req() req: Request): string {
    return req.cookies.name || 'cookie is undefined';
  }
}
