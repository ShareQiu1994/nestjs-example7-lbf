import { Injectable } from '@nestjs/common';
import * as Core from '@alicloud/pop-core';

@Injectable()
export class SmsService {
  client: any;
  constructor() {
    this.client = new Core({
      accessKeyId: 'LTAI4GHkP1854Di7yqyrCQCs',
      accessKeySecret: 'gma9Yeikgt5OkMBvyxbnCr44E6E1GM',
      endpoint: 'https://dysmsapi.aliyuncs.com',
      apiVersion: '2017-05-25',
    });
  }

  sendSms(params, requestOption) {
    return this.client.request('SendSms', params, requestOption).then(
      result => {
        // console.log(JSON.stringify(result));
        return result;
      },
      ex => {
        console.log(ex);
        return ex.data;
      },
    );
  }
}
