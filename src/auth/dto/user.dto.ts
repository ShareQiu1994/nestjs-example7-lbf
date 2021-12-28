/*
 * @version: 1.0.0
 * @Author: liubofang<421419567@qq.com>
 * @Date: 2020-12-05 17:17:28
 * @LastEditTime: 2020-12-05 22:07:21
 */
import { Field, InputType } from '@nestjs/graphql'; // 定义 graphql的相关 装饰器
import { ApiProperty } from '@nestjs/swagger'; // 定义 swagger相关 装饰器

@InputType()
export class UserArgs {
  @Field()
  @ApiProperty({
    name: 'username',
    example: 'liubofang'
  })
  username: string;
  

  @Field()
  @ApiProperty({
    name: 'password',
    example: '123456'
  })
  password: string;
}
