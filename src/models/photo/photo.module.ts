/*
 * @version: 1.0.0
 * @Author: liubofang<421419567@qq.com>
 * @Date: 2020-12-05 10:57:28
 * @LastEditTime: 2020-12-05 16:16:12
 */

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Photo } from "./photo.entity";
import { PhotoService } from "./photo.service";
import { PhotoController } from "./photo.controller";
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [TypeOrmModule.forFeature([Photo]), PassportModule.register({ defaultStrategy: 'jwt' }),],
  providers: [PhotoService],
  exports: [PhotoService],
  controllers: [PhotoController],
})
export class PhotoModule {}