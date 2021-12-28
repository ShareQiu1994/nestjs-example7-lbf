/*
 * @version: 1.0.0
 * @Author: liubofang<421419567@qq.com>
 * @Date: 2020-10-03 23:18:12
 * @LastEditTime: 2020-12-07 16:26:20
 */
import {
  Get,
  Req,
  Res,
  Controller,
  Post,
  Body,
  Query,
  Session,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { ApiTags, ApiQuery, ApiOperation } from '@nestjs/swagger';
import { LoginArgs } from './dto/login.dto';
import { UserArgs } from './dto/user.dto';
import * as svgCaptcha from 'svg-captcha';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signInToken') // 注册token
  @ApiOperation({ summary: '获取token' })
  async createToken(@Body() userArgs: UserArgs): Promise<any> {
    return await this.authService.signIn(userArgs);
  }

  @Get('verifyToken') // 解析token
  @ApiOperation({ summary: '解析token' })
  @ApiQuery({
    name: 'token',
    description: '请输入token',
  })
  async analysisToken(@Query('token') token: string): Promise<any> {
    return await this.authService.verify(token);
  }

  @Post('login')
  @ApiOperation({ summary: '登录' })
  async login(@Session() session: any,@Body() loginArgs: LoginArgs): Promise<any> {
    this.authService.validateCode(session,loginArgs.code)
    return await this.authService.signIn(loginArgs);
  }

  // 验证码
  @Get('captcha')
  @ApiOperation({ summary: '获取验证码图片' })
  code(@Session() session: any, @Req() req: Request, @Res() res: Response) {
    var captcha = svgCaptcha.create();
    session.captcha = captcha.text; // 设置session
    res.type('svg');
    res.status(200).send(captcha.data);
  }
}
