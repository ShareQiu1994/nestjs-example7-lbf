import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Bookmark } from './bookmark.entity';
import { BookmarkService } from './bookmark.service';
import { BookmarkArgs } from './dto/bookmark.dto';
import { GqlAuthGuard } from '../../auth/jwt.graphql.strategy';
import { ParseIntPipe } from '../../common/pipetransform/parseint.pipe'; // 管道数据转换 (数据数据转换)

@Resolver(of => Bookmark)
// @UseGuards(GqlAuthGuard) // graphql添加jwt鉴权 调试时建议关闭
export class BookmarkResolver {
  constructor(private readonly BookmarkService: BookmarkService) {}

  // 获取所有bookmark
  @Query(returns => [Bookmark])
  async bookmarkFindAll(): Promise<Bookmark[]> {
    return this.BookmarkService.findAll();
  }

  // 根据id获取指定bookmark
  @Query(returns => Bookmark)
  async bookmarkFindId(
    @Args('id', new ParseIntPipe()) id: number,
  ): Promise<Bookmark> {
    return this.BookmarkService.findId(id);
  }

  // 新增bookmark
  @Mutation(returns => Bookmark)
  async bookmarkAdd(
    @Args('Bookmark') BookmarkArgs: BookmarkArgs,
  ): Promise<Bookmark> {
    return this.BookmarkService.add(BookmarkArgs);
  }

  // 根据id修改指定bookmark
  @Mutation(returns => Bookmark)
  async bookmarkUpdate(
    @Args('id', new ParseIntPipe()) id: number,
    @Args('Bookmark') BookmarkArgs: BookmarkArgs,
  ): Promise<Bookmark> {
    return this.BookmarkService.update(id, BookmarkArgs);
  }

  // 根据id删除指定bookmark
  @Mutation(returns => Bookmark)
  async bookmarkDelete(
    @Args('id', new ParseIntPipe()) id: number,
  ): Promise<Bookmark> {
    return this.BookmarkService.remove(id);
  }
}
