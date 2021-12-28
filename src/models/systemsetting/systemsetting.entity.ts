import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'; // 定义 typeorm相关 装饰器
import { Field, ID, ObjectType } from '@nestjs/graphql';

import GraphQLJSON from 'graphql-type-json';

@Entity()
@ObjectType()
export class Systemsetting {
  @Field(type => ID)
  @PrimaryGeneratedColumn() // 主键 递增
  id: number;

  @Field()
  @Column({
    name: 'name',
    length: '32',
    type: 'varchar',
  })
  name: string;

  @Field(type => GraphQLJSON)
  @Column({
    name: 'clock',
    type: 'json',
  })
  clock: JSON;

  @Field()
  @Column({
    name: 'terrain',
    type: 'int2',
  })
  terrain: number;

  @Field()
  @Column({
    name: 'earthRotation',
    type: 'int2',
  })
  earthRotation: number;

  @Field(type => GraphQLJSON)
  @Column({
    name: 'appearanceSettings',
    type: 'json',
  })
  appearanceSettings: JSON;

  @Field(type => GraphQLJSON)
  @Column({
    name: 'postProcessing',
    type: 'json',
  })
  postProcessing: JSON;

  @Field()
  @Column({
    name: 'wireframe',
    type: 'int2',
  })
  wireframe: number;

  @Field()
  @Column({
    name: 'depthTestAgainstTerrain',
    type: 'int2',
  })
  depthTestAgainstTerrain: number;

  @Field()
  @Column({
    name: 'currentTime',
    type: 'int2',
  })
  currentTime: number;

  @Field(type => GraphQLJSON)
  @Column({
    name: 'clustering',
    type: 'json',
  })
  clustering: JSON;

  @Field()
  @Column({
    name: 'theme',
    type: 'int2',
  })
  theme: number;

  @Field(type => GraphQLJSON)
  @Column({
    name: 'layer',
    type: 'json',
  })
  layer: JSON;
}
