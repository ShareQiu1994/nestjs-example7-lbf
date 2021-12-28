import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery, ApiTags, ApiOperation } from '@nestjs/swagger';
import { SmsService } from './sms.service';

@ApiTags('communicationService')
@Controller('sms')
export class SmsController {
  constructor(private readonly smsService: SmsService) {}

  @ApiQuery({
    name: 'phoneNumber',
    example: '15819588170', // 默认值
  })
  @ApiOperation({ summary: '发送短信' })
  @Get()
  async sendSms(@Query() Query: any):Promise<any>{
    var key = '';
    for (var i = 0; i < 4; i++) {
      key += Math.floor(Math.random() * 10);
    }

    var params = {
      RegionId: 'cn-hangzhou',
      PhoneNumbers: Query.phoneNumber,
      SignName: '鸡丝地图',
      TemplateCode: 'SMS_204127915',
      TemplateParam: `{\"code\":\"${key}\"}`,
    };

    var requestOption = {
      method: 'POST',
    };
    return await this.smsService.sendSms(params, requestOption);
  }
}
