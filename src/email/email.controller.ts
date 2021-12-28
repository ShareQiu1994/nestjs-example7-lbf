import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery, ApiTags, ApiOperation } from '@nestjs/swagger';
import { EmailService } from './email.service';

@ApiTags('communicationService')
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @ApiQuery({
    name: 'toMaile',
    example: 'qiulaoshu1994@163.com', // 默认值
  })
  @ApiOperation({ summary: '发送邮件' })
  @Get()
  async sendEmail(@Query() Query: any): Promise<any> {
    return await this.emailService.sendEmail(Query.toMaile);
  }
}
