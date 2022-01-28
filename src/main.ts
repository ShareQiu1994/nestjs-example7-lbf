/*
 * @version: 1.0.0
 * @Author: liubofang<421419567@qq.com>
 * @Date: 2020-10-03 23:18:12
 * @LastEditTime: 2021-05-21 16:00:50
 */
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Log4jsService } from '@quickts/nestjs-log4js';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { WsAdapter } from '@nestjs/platform-ws';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { HttpExceptionFilter } from './common/exception/http-exception.filter'; // 异常过滤器
import { join } from 'path';
import * as log4Config from './config/log4Options';
import * as systemConfig from './config/systemOptions';
import * as log4js from 'log4js';
import * as cors from 'cors';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { createProxyMiddleware, Filter, Options, RequestHandler } from 'http-proxy-middleware';

async function bootstrap() {
  /* 注册log4js日志 */
  const log4jsService = new Log4jsService(log4Config.default());
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: log4jsService,
  });
  
  /* 配置session中级件 */
  app.use(
    session({
      secret: 'liubf', // 一个String类型的字符串，作为服务器端生成session的签名
      cookie: { maxAge: 60000 },  // 设置返回到前端key的属性，默认值为{ path: ‘/’, httpOnly: true, secure: false, maxAge: null }
      resave: false, // 强制保存session即使它并没有变化,。默认为true。建议设置成false。 don't save session if unmodified
      saveUninitialized: true, // 强制将未初始化的session存储。当新建了一个session且未设定属性或值时，它就处于未初始化状态。在设定一个cookie前，这对于登陆验证，减轻服务端存储压力，权限控制是有帮助的。（默认：true）。建议手动添加。
    }),
  );

  /* 配置cookie中间件 */
  app.use(cookieParser());

  /* 连接mq微服务 */
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.MQTT,
    options: {
      url: systemConfig.default().mqttserver,
    },
  });

  // /* 监听所有http请求日志 */
  const logger = log4js.getLogger('http');
  app.use(log4js.connectLogger(logger, { level: 'trace' }));

  /* 跨域配置 */
  app.use(cors());

  /* 全局异常过滤器 */
  app.useGlobalFilters(new HttpExceptionFilter());

  /*  socket链接 采用ws方式(适配器) ws/io只能选择一种 */
  // app.useWebSocketAdapter(new WsAdapter(app));
  /* socket链接 采用Io方式(适配器) ws/io只能选择一种 */
  app.useWebSocketAdapter(new IoAdapter(app));

  /* 配置静态目录 */
  app.useStaticAssets('./public'); // 配置静态资源目录 http://localhost:8096/css/index.css

  /* 配置模板引擎 */
  // app.setViewEngine('ejs'); //配置模板引擎类型 必须提前安装好依赖
  app.engine('ejs', require('ejs').__express);
  app.setBaseViewsDir('./views');
  /* 反向代理 */
  app.use('/gwc', createProxyMiddleware({ target: process.env.GEOSERVER, changeOrigin: true })); 
  // http://localhost:3000/api/foo/bar -> http://www.example.org/api/foo/bar

  /* swagger配置 */
  const options = new DocumentBuilder()
    .setTitle('LBF_Service Api')
    .setDescription('LBF_在线API文档')
    .setVersion('1.0')
    .addBearerAuth() // 文档 添加jwt请求验证头
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/swagger', app, document);

  app.useStaticAssets(join(__dirname, '/static'), {
    prefix: '/swagger',
  });
  // 连接主服务
  await app.listen(systemConfig.default().port);
  // 连接所有微服务
  await app.startAllMicroservicesAsync();

  new Logger('StartService').log(
    `\x1B[33mNestJS程序启动成功！\x1B[0m\x1B[36mhttp://localhost:${
      systemConfig.default().port
    }\x1B[0m`,
  );
}
bootstrap();
