/*
 * @version: 1.0.0
 * @Author: liubofang<421419567@qq.com>
 * @Date: 2020-10-16 11:20:35
 * @LastEditTime: 2021-05-21 16:01:56
 */
import { Controller, Inject } from '@nestjs/common';
import {
  Payload,
  Ctx,
  MqttContext,
  EventPattern,
  Client,
  ClientProxy,
  Transport,
  MessagePattern,
} from '@nestjs/microservices';

import { MqttService } from './mqtt.service';

@Controller()
export class MqttController {

  constructor(private readonly MqttService: MqttService) {}
  // @EventPattern('#')
  // connect(@Ctx() context: MqttContext) {
  //   // console.log(context.getPacket());
  //   console.log('收到数据');
  //   if (context.getPacket().cmd === 'disconnect') {
  //     console.log('MQTT断开连接');
  //   }
  // }

  /* 监听GPS */
  @MessagePattern('GpsInfoNotify')
  getNotifications(@Ctx() context: MqttContext) {
    
    // console.log(context.getPacket().payload.toString());   // 监听普天宜通的GPS数据

    // console.log(`Topic: ${context.getPacket()}`);
    // console.log(this.MqttService)

    /* 将mq监听到消息内容 发送给socket.io */
    this.MqttService.sendMsgOfSocketIo(context.getPacket().payload.toString())
  }
}
