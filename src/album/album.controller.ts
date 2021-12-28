/*
 * @version: 1.0.0
 * @Author: liubofang<421419567@qq.com>
 * @Date: 2020-10-13 10:52:31
 * @LastEditTime: 2020-12-06 16:32:03
 */
import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  Get,
  Body,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { AlbumService } from './album.service';
import { ApiTags, ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { FileUploadDto } from './dto/fileUpload.dto';

@ApiTags('album')
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @ApiOperation({ summary: '文件上传' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File', 
    type: FileUploadDto,
  })
  @UseInterceptors(FileInterceptor('file'))
  @Post('file')
  async upload(@UploadedFile() file, @Body() body) {
    return this.albumService.uploadFile(file, body);
  }

  @ApiOperation({ summary: '多文件上传' })
  @ApiConsumes('multipart/form-data')
  // 目前官方没有多文件上传的swagger控件。
  @ApiBody({
    description: 'Files',
    type: FileUploadDto,
  })
  @UseInterceptors(FilesInterceptor('file'))
  @Post('files')
  async uploads(@UploadedFiles() files, @Body() body) {
    return this.albumService.uploadFiles(files, body)
  }

  @ApiOperation({ summary: '文件下载' })
  @Get('export')
  async downloadAll(@Res() res: Response) {
    const { filename, tarStream } = await this.albumService.downloadAll();
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    tarStream.pipe(res);
  }
}
