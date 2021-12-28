/*
 * @version: 1.0.0
 * @Author: liubofang<421419567@qq.com>
 * @Date: 2020-12-05 10:57:28
 * @LastEditTime: 2020-12-05 16:20:46
 */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'; // 定义 typeorm相关 装饰器
import { ApiProperty } from '@nestjs/swagger'; // 定义 swagger相关 装饰器

@Entity()
export class Photo {
  @PrimaryGeneratedColumn() // 主键 递增
  id: number;

  @Column({
    name: 'name',
    length: '255',
    type: 'varchar',
    nullable: true,
  })
  @ApiProperty()
  name: string;

  @Column({
    name: 'description',
    type: 'text',
    nullable: true,
  }) // text类型
  @ApiProperty()
  description: string;

  @Column({
    name: 'filename',
    length: '255',
    type: 'varchar',
    nullable: true,
  })
  @ApiProperty()
  filename: string;

  @Column({
    name: 'views',
    type: 'int',
    nullable: true,
  }) // int类型
  @ApiProperty()
  views: number;

  @Column({
    name: 'isPublished',
    type: 'bool',
    nullable: true,
  })
  @ApiProperty()
  isPublished: boolean;
}
