import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'; // 定义 typeorm相关 装饰器
import { Field, ID, ObjectType } from '@nestjs/graphql'; // 定义 graphql的相关 装饰器
import GraphQLJSON from 'graphql-type-json';

@Entity()
@ObjectType()
export class Bookmark {
  @Field(type => ID)
  @PrimaryGeneratedColumn() // 主键 递增
  id: number;

  @Field({ nullable: true })
  @Column({
    name: 'userid',
    type: 'int',
    nullable: true,
  })
  userid: number;

  @Field({ nullable: true })
  @Column({
    name: 'name',
    length: '255',
    type: 'varchar',
    nullable: true,
  })
  name: string;

  @Field({ nullable: true })
  @Column({
    name: 'date',
    length: '255',
    type: 'varchar',
    nullable: true,
  })
  date: string;

  @Field(type => GraphQLJSON) // graphql 查询JSON 必须引用这个库graphql-type-json
  @Column({
    name: 'json',
    type: 'json',
  })
  json: JSON;
}
