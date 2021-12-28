/*
 * @version: 1.0.0
 * @Author: liubofang<421419567@qq.com>
 * @Date: 2020-10-03 23:18:12
 * @LastEditTime: 2020-11-23 15:53:20
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
import { BookmarkService } from './bookmark.service';
import { Bookmark } from './bookmark.entity';
import {
  ApiBearerAuth,
  ApiTags,
  ApiParam,
  ApiOperation,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { BookmarkArgs } from './dto/bookmark.dto';
import { ParseIntPipe } from '../../common/pipetransform/parseint.pipe'; // 管道数据转换 (数据数据转换)
// import { HttpExceptionFilter } from '../../common/exception/http-exception.filter'; // 异常过滤器

@ApiTags('bookmark')
@ApiBearerAuth() // 在线文档增加登录鉴权 (Swagger)
// @UseGuards(AuthGuard('jwt')) // 整个类的方法都是jwt鉴权的
// @UseFilters(new HttpExceptionFilter()) // 异常过滤器
@Controller('bookmark')
export class BookmarkController {
  constructor(private readonly BookmarkService: BookmarkService) {}

  // 获取所有bookmark
  @Get()
  @ApiOperation({ summary: '获取所有bookmark' })
  findAll(): Promise<Bookmark[]> {
    return this.BookmarkService.findAll();
  }

  // 新增bookmark
  @Post()
  @ApiOperation({ summary: '新增bookmark' })
  add(@Body() BookmarkArgs: BookmarkArgs): Promise<Bookmark> {
    return this.BookmarkService.add(BookmarkArgs);
  }

  // 根据id获取指定bookmark
  @Get(':id')
  @ApiParam({
    name: 'id',
    description: '参数id',
  })
  @ApiOperation({ summary: '根据id获取指定bookmark' })
  findId(@Param('id', new ParseIntPipe()) id: number): Promise<Bookmark> {
    return this.BookmarkService.findId(id);
  }

  // 根据id删除指定bookmark
  @Delete(':id')
  @ApiOperation({ summary: '根据id删除bookmark' })
   remove(@Param('id', new ParseIntPipe()) id: number): Promise<Bookmark> {
    return this.BookmarkService.remove(id);
  }

  // 根据id修改指定bookmark
  @Put(':id')
  @ApiOperation({ summary: '根据id修改bookmark' })
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() BookmarkArgs: BookmarkArgs,
  ): Promise<Bookmark> {
    return this.BookmarkService.update(id, BookmarkArgs);
  }
}
