import { registerAs } from '@nestjs/config'; // 配置命名空间

export default registerAs('redisOptions', () => ({
  redis:{
    host: 'localhost',
    port: 6379,
  }
}));