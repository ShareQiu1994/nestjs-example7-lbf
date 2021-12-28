/*
 * @version: 1.0.0
 * @Author: liubofang<421419567@qq.com>
 * @Date: 2020-10-03 23:18:12
 * @LastEditTime: 2020-12-07 16:30:06
 */
import { JwtService } from '@nestjs/jwt';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { UsersService } from '../models/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async signIn(args: any): Promise<string> {
    // In the real-world app you shouldn't expose this method publicly
    // instead, return a token once you verify user credentials
    let user = await this.validateUser(args);
    if (!user) {
      throw new HttpException(
        {
          message: 'username or password error!',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    return this.jwtService.sign(args);
  }

  async verify(token: string): Promise<Object> {
    // In the real-world app you shouldn't expose this method publicly
    // instead, return a token once you verify user credentials
    return this.jwtService.verify(token);
  }

  validateCode(session: any, code: string): boolean {
    if (session.captcha !== code) {
      throw new HttpException(
        {
          message: 'captcha error!',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    return true;
  }

  async validateUser(args: any): Promise<any> {
    let { username, password } = args;
    let result = this.usersService.findOne({ username, password });
    return result;
  }
}
