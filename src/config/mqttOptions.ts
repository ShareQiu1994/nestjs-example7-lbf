import { registerAs } from '@nestjs/config'; // 配置命名空间
import { Transport } from '@nestjs/microservices';
import * as systemConfig from './systemOptions';

export default registerAs('mqttOptions', () => ({
        transport: Transport.MQTT,
        options: {
          url: systemConfig.default().mqttserver,
        }
}));
