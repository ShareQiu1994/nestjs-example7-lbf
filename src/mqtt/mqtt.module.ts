import { Module } from '@nestjs/common';
import { MqttService } from './mqtt.service';
import { MqttController } from './mqtt.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { SocketIoGateway } from '../socketio/socketio.gateway';

@Module({
  imports: [
    ClientsModule.registerAsync([
      { 
        name:'MQTT',
        useFactory: (config: ConfigService) => {
          return  config.get('mqttOptions');
        },
        inject: [ConfigService],
      }
    ])
  ],
  providers: [MqttService,SocketIoGateway],
  controllers: [MqttController],
})
export class MqttModule {}
