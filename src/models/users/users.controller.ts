/*
 * @version: 1.0.0
 * @Author: liubofang<421419567@qq.com>
 * @Date: 2020-12-05 10:57:28
 * @LastEditTime: 2020-12-05 18:59:24
 */
import { Controller, UseGuards, Post, Body } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Users } from './users.entity';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginArgs } from '../../auth/dto/login.dto';

@Crud({
  model: {
    type: Users,
  },
})
@UseGuards(AuthGuard('jwt')) // 整个类的方法都是jwt鉴权的
@ApiBearerAuth() // 在线文档增加登录鉴权 (Swagger)
@ApiTags('Users')
@Controller('Users')
export class UsersController implements CrudController<Users> {
  constructor(public service: UsersService) {}
}
