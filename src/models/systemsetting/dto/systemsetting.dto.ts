import { IsInt, IsString, IsJSON } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql'; // 定义 graphql的相关 装饰器
import { ApiProperty } from '@nestjs/swagger'; // 定义 swagger相关 装饰器
import GraphQLJSON from 'graphql-type-json';

@InputType()
export class SystemsettingArgs {
  @Field()
  @IsString({
    // 验证字段类型
    message: 'name字段必须字符串',
  })
  @ApiProperty({
    name: 'name',
  })
  name: string;

  @Field(() => GraphQLJSON)
  @ApiProperty({
    name: 'clock',
    enum: ['{"age":1,"name":"刘博方"}'], // 枚举值 供使用者参考
  })
  @IsJSON({
    message: 'clock字段必须JSON',
  })
  clock: JSON;

  @Field()
  @IsInt({
    message: 'earthRotation字段必须为数值',
  })
  @ApiProperty({
    name: 'earthRotation',
  })
  earthRotation: number;

  @Field(() => GraphQLJSON)
  @ApiProperty({
    name: 'appearanceSettings',
    enum: ['{"age":1,"name":"刘博方"}'], // 枚举值 供使用者参考
  })
  @IsJSON({
    message: 'appearanceSettings字段必须JSON',
  })
  appearanceSettings: JSON;

  @Field(() => GraphQLJSON)
  @ApiProperty({
    name: 'postProcessing',
    enum: ['{"age":1,"name":"刘博方"}'], // 枚举值 供使用者参考
  })
  @IsJSON({
    message: 'postProcessing字段必须JSON',
  })
  postProcessing: JSON;

  @Field()
  @IsInt({
    message: 'wireframe字段必须为数值',
  })
  @ApiProperty({
    name: 'wireframe',
  })
  wireframe: number;

  @Field()
  @IsInt({
    message: 'depthTestAgainstTerrain字段必须为数值',
  })
  @ApiProperty({
    name: 'depthTestAgainstTerrain',
  })
  depthTestAgainstTerrain: number;

  @Field()
  @IsInt({
    message: 'currentTime字段必须为数值',
  })
  @ApiProperty({
    name: 'currentTime',
  })
  currentTime: number;

  @Field(() => GraphQLJSON)
  @IsJSON({
    message: 'clustering字段必须为JSON',
  })
  @ApiProperty({
    name: 'clustering',
  })
  clustering: JSON;

  @Field()
  @IsInt({
    message: 'theme字段必须为数值',
  })
  @ApiProperty({
    name: 'theme',
  })
  theme: number;

  @Field(() => GraphQLJSON)
  @IsJSON({
    message: 'layer字段必须为JSON',
  })
  @ApiProperty({
    name: 'layer',
  })
  layer: JSON;
}
