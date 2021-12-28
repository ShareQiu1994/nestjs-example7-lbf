/*
 * @version: 1.0.0
 * @Author: liubofang<421419567@qq.com>
 * @Date: 2020-12-05 10:57:28
 * @LastEditTime: 2020-12-05 16:15:11
 */
import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Photo } from './photo.entity';
import { PhotoService } from './photo.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Crud({
  model: {
    type: Photo,
  }
})
@UseGuards(AuthGuard('jwt')) // 整个类的方法都是jwt鉴权的
@ApiBearerAuth() // 在线文档增加登录鉴权 (Swagger)
@ApiTags('photo')
@Controller('photo')
export class PhotoController implements CrudController<Photo> {
  constructor(public service: PhotoService) {}
}
