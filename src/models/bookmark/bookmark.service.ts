/*
 * @version: 1.0.0
 * @Author: liubofang<421419567@qq.com>
 * @Date: 2020-10-03 23:18:12
 * @LastEditTime: 2020-12-06 10:35:38
 */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bookmark } from './bookmark.entity';
import { BookmarkArgs } from './dto/bookmark.dto';
import * as moment from 'moment';

@Injectable()
export class BookmarkService {
  constructor(
    @InjectRepository(Bookmark)
    private readonly bookmarkRepository: Repository<Bookmark>,
  ) {}

  // 获取所有bookmark
  async findAll(): Promise<Bookmark[]> {
    return this.bookmarkRepository.find();
  }

  // 新增bookmark
  async add(BookmarkArgs: BookmarkArgs): Promise<Bookmark> {
    BookmarkArgs.date = moment().format('YYYY-MM-DD'); // 记录当天时间
    let bookmark = Object.assign({}, BookmarkArgs);
    return this.bookmarkRepository.save(bookmark);
  }

  // 根据id获取指定bookmark
  async findId(id: number): Promise<Bookmark> {
    let bookmarkRes = await this.bookmarkRepository.findOne({
      id: id,
    });

    if (bookmarkRes) return bookmarkRes;
    this.notFoundIdError(id);
  }

  // 根据id删除指定bookmark
  async remove(id: number): Promise<Bookmark> {
    let bookmark = await this.findId(id); // 获取实体并删除
    if (bookmark) {
      this.bookmarkRepository.remove(bookmark);
      return bookmark;
    }
    this.notFoundIdError(id);
  }

  // 根据id修改指定bookmark
  async update(id: number, BookmarkArgs: BookmarkArgs): Promise<Bookmark> {
    let bookmark = await this.findId(id); // 获取实体并删除
    if (bookmark) {
      BookmarkArgs.date = moment().format('YYYY-MM-DD'); // 记录当天时间
      bookmark = Object.assign(bookmark, BookmarkArgs); // 方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target） 参数1:tatgert 参数2:source
      return this.bookmarkRepository.save(bookmark);
    }
    this.notFoundIdError(id);
  }

  // id寻找不到数据 异常处理
  notFoundIdError(id: number) {
    throw new HttpException(
      `抱歉，指定的id:${id}找不到对应的数据！`,
      HttpStatus.FORBIDDEN,
    );
  }
}
