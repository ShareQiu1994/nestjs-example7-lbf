/*
 * @version: 1.0.0
 * @Author: liubofang<421419567@qq.com>
 * @Date: 2020-12-05 10:57:28
 * @LastEditTime: 2020-12-05 11:37:02
 */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Photo } from './photo.entity';

@Injectable()
export class PhotoService extends TypeOrmCrudService<Photo> {
  constructor(@InjectRepository(Photo) repo) {
    super(repo);
  }
}