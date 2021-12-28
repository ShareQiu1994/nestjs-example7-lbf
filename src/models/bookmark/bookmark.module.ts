import { Module } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { BookmarkController } from './bookmark.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bookmark } from './bookmark.entity';
import { PassportModule } from '@nestjs/passport';
import { BookmarkResolver } from './bookmark.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bookmark]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [BookmarkResolver, BookmarkService],
  controllers: [BookmarkController],
})
export class BookmarkModule {}
