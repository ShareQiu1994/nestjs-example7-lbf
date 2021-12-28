/*
 * @version: 1.0.0
 * @Author: liubofang<421419567@qq.com>
 * @Date: 2020-10-03 23:18:12
 * @LastEditTime: 2020-11-23 15:53:12
 */
import {
  Controller,
  Get,
  UseGuards,
  Param,
  Post,
  Body,
  Delete,
  Put,
  UseInterceptors,
  UseFilters,
} from '@nestjs/common';
import { SystemsettingService } from './systemsetting.service';
import { Systemsetting } from './systemsetting.entity';
import {
  ApiBearerAuth,
  ApiTags,
  ApiParam,
  ApiOperation,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { SystemsettingArgs } from './dto/systemsetting.dto';
import { ParseIntPipe } from '../../common/pipetransform/parseint.pipe'; // 管道数据转换 (数据数据转换)

@ApiTags('systemsetting')
@Controller('systemsetting')
@ApiBearerAuth() // 在线文档增加登录鉴权 (Swagger)
// @UseGuards(AuthGuard('jwt')) // 整个类的方法都是jwt鉴权的
export class SystemsettingController {
  constructor(private readonly SystemsettingService: SystemsettingService) {}

  // 获取所有Systemsetting
  @Get()
  @ApiOperation({ summary: '获取所有systemsetting' })
  findAll(): Promise<Systemsetting[]> {
    return this.SystemsettingService.findAll();
  }

  // 新增Systemsetting
  @Post()
  @ApiOperation({ summary: '新增systemsetting' })
  add(@Body() SystemsettingArgs: SystemsettingArgs): Promise<Systemsetting> {
    return this.SystemsettingService.add(SystemsettingArgs);
  }

  // 根据id获取指定Systemsetting
  @Get(':id')
  @ApiParam({
    name: 'id',
    description: '参数id',
  })
  @ApiOperation({ summary: '根据id获取指定systemsetting' })
  findId(@Param('id', new ParseIntPipe()) id: number): Promise<Systemsetting> {
    return this.SystemsettingService.findId(id);
  }

  // 根据id删除指定Systemsetting
  @Delete(':id')
  @ApiOperation({ summary: '根据id删除systemsetting' })
   remove(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<Systemsetting> {
    return this.SystemsettingService.remove(id);
  }

  // 根据id修改指定Systemsetting
  @Put(':id')
  @ApiOperation({ summary: '根据id修改systemsetting' })
   update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() SystemsettingArgs: SystemsettingArgs,
  ): Promise<Systemsetting> {
    return this.SystemsettingService.update(id, SystemsettingArgs);
  }
}
