import { Injectable, Logger, Inject } from '@nestjs/common';
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
import { SocketIoGateway } from '../socketio/socketio.gateway';


@Injectable()
export class MqttService {
  constructor(@Inject('MQTT') private client: ClientProxy, private socketIoGateway: SocketIoGateway,) {}
  public async onModuleInit(): Promise<void> {
    let mqttClient = await this.client.connect();
    // await (await this.sendMessage()).toPromise();
  }
  // async sendMessage(): Promise<any> {
  //   const data: number[] = [5, 6];
  //   return this.client.send<number>('notifications', data);
  // }

  sendMsgOfSocketIo(msg:any){
    // 调用网关服务的方法 往socket.io客户端发送数据
    this.socketIoGateway.sendClientMsg(msg)
  }
}
