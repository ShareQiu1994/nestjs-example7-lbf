/*
 * @version: 1.0.0
 * @Author: liubofang<421419567@qq.com>
 * @Date: 2020-12-05 10:57:28
 * @LastEditTime: 2020-12-05 17:21:26
 */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'; // 定义 typeorm相关 装饰器
import { ApiProperty } from '@nestjs/swagger'; // 定义 swagger相关 装饰器

@Entity()
export class Users {
  @PrimaryGeneratedColumn() // 主键 递增
  id: number;

  @Column({
    name: 'username',
    length: '255',
    type: 'varchar',
    nullable: true,
  })
  @ApiProperty()
  username: string;

  @Column({
    name: 'password',
    length: '255',
    type: 'varchar',
    nullable: true,
  })
  @ApiProperty()
  password: string;

  @Column({
    name: 'telephone',
    length: '255',
    type: 'varchar',
    nullable: true,
  })
  @ApiProperty()
  telephone: string;

  @Column({
    name: 'email',
    length: '255',
    type: 'varchar',
    nullable: true,
  })
  @ApiProperty()
  email: string;
}
