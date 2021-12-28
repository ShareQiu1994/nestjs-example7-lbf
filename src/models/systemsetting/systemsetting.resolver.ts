import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Systemsetting } from './systemsetting.entity';
import { SystemsettingService } from './systemsetting.service';
import { SystemsettingArgs } from './dto/systemsetting.dto';
import { GqlAuthGuard } from '../../auth/jwt.graphql.strategy';
import { ParseIntPipe } from '../../common/pipetransform/parseint.pipe'; // 管道数据转换 (数据数据转换)

@Resolver(of => Systemsetting)
@UseGuards(GqlAuthGuard) // graphql添加jwt鉴权 调试时建议关闭
export class SystemsettingResolver {
  constructor(private readonly SystemsettingService: SystemsettingService) {}

  // 获取所有Systemsetting
  @Query(returns => [Systemsetting])
  async SystemsettingFindAll(): Promise<Systemsetting[]> {
    return this.SystemsettingService.findAll();
  }

  // 根据id获取指定Systemsetting
  @Query(returns => Systemsetting)
  async SystemsettingFindId(
    @Args('id', new ParseIntPipe()) id: number,
  ): Promise<Systemsetting> {
    return this.SystemsettingService.findId(id);
  }

  // 新增Systemsetting
  @Mutation(returns => Systemsetting)
  async SystemsettingAdd(
    @Args('Systemsetting') SystemsettingArgs: SystemsettingArgs,
  ): Promise<Systemsetting> {
    return this.SystemsettingService.add(SystemsettingArgs);
  }

  // 根据id修改指定Systemsetting
  @Mutation(returns => Systemsetting)
  async SystemsettingUpdate(
    @Args('id', new ParseIntPipe()) id: number,
    @Args('Systemsetting') SystemsettingArgs: SystemsettingArgs,
  ): Promise<Systemsetting> {
    return this.SystemsettingService.update(id, SystemsettingArgs);
  }

  // 根据id删除指定Systemsetting
  @Mutation(returns => Systemsetting)
  async SystemsettingDelete(
    @Args('id', new ParseIntPipe()) id: number,
  ): Promise<Systemsetting> {
    return this.SystemsettingService.remove(id);
  }
}
