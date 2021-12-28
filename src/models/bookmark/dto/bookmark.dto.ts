/*
 * @version: 1.0.0
 * @Author: liubofang<421419567@qq.com>
 * @Date: 2020-10-03 23:18:12
 * @LastEditTime: 2020-12-05 22:05:09
 */
import { IsOptional, IsString, IsInt, IsJSON } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql'; // 定义 graphql的相关 装饰器
import { ApiProperty } from '@nestjs/swagger'; // 定义 swagger相关 装饰器
import GraphQLJSON from 'graphql-type-json';

@InputType()
export class BookmarkArgs {
  @Field({ nullable: true }) // 可以为空
  @IsOptional() // 可选的
  @IsInt({
    // 验证字段类型
    message: 'userid字段必须为数值',
  })
  @ApiProperty({
    name: 'userid',
  })
  userid?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString({
    message: 'name字段必须字符串',
  })
  @ApiProperty({
    name: 'name',
  })
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString({
    message: 'date字段必须字符串',
  })
  @ApiProperty({
    name: 'date',
  })
  date?: string;

  @Field(() => GraphQLJSON)
  @ApiProperty({
    name: 'json',
    enum: ['{"age":1,"name":"刘博方"}'], // 枚举值 供使用者参考
  })
  @IsJSON({
    message: 'json字段必须JSON',
  })
  json: JSON;
}
