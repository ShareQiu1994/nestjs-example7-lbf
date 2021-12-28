/*
 * @version: 1.0.0
 * @Author: liubofang<421419567@qq.com>
 * @Date: 2020-12-06 14:38:53
 * @LastEditTime: 2020-12-06 16:10:59
 */
import { InputType } from '@nestjs/graphql'; // 定义 graphql的相关 装饰器
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
