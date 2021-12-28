/*
 * @version: 1.0.0
 * @Author: liubofang<421419567@qq.com>
 * @Date: 2020-10-13 10:52:31
 * @LastEditTime: 2020-12-06 16:09:53
 */
import { Injectable } from '@nestjs/common';
import { tar } from 'compressing';
import { ConfigService } from '@nestjs/config';

import { createWriteStream } from 'fs';
import { join } from 'path';

@Injectable()
export class AlbumService {
  constructor(private readonly configService: ConfigService) {}
  
  // 文件上传逻辑 https://www.itying.com/nestjs/start-upload.html
  /**
   * @name: 
   * @Author: liubofang<421419567@qq.com>
   * @msg: 单文件上传 nestjs的upload内部已经实现了上传 不需要自己写逻辑
   * @param {*} file
   * @param {*} body
   * @return {*}
   */
  uploadFile(file, body) {
    console.log(body);
    console.log(file);
    return '上传成功';
  }
 /**
   * @name: 
   * @Author: liubofang<421419567@qq.com>
   * @msg: 多文件上传 nestjs的upload内部已经实现了上传 不需要自己写逻辑
   * @param {*} files
   * @param {*} body
   * @return {*}
   */
  uploadFiles(files, body) {
    console.log(body);
    console.log(files);
    return '上传成功';
  }

  async downloadAll() {
    const uploadDir = this.configService.get('fileOptions').root;
    const tarStream = new tar.Stream();
    await tarStream.addEntry(uploadDir);
    return { filename: 'hello-world.tar', tarStream };
  }
}
