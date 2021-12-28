import { registerAs } from '@nestjs/config'; // 配置命名空间

export default registerAs('systemOptions', () => ({
  port: process.env.PORT || 3000,
  geoserver: process.env.GEOSERVER || 'http://localhost:8097/geoserver',
  mqttserver: process.env.MQTT || 'mqtt://58.248.254.109:1883',
}));
