import {
  Module,
  NestModule,
  RequestMethod,
  MiddlewareConsumer,
} from '@nestjs/common';
// 入口app
import { AppController } from './app.controller';
import { AppService } from './app.service';
// 中间件相关
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
// ORM相关
import { TypeOrmModule } from '@nestjs/typeorm';
// graphql相关
import { GraphQLModule } from '@nestjs/graphql';

// 业务表相关
import { SystemsettingModule } from './models/systemsetting/systemsetting.module';
import { BookmarkModule } from './models/bookmark/bookmark.module';
import { PhotoModule } from './models/photo/photo.module';
import { UsersModule } from './models/users/users.module';

// socket相关
import { SocketIoModule } from './socketio/socketio.module';
import { WsModule } from './ws/ws.module';
// 鉴权相关
import { AuthModule } from './auth/auth.module';

// 邮箱相关 @nestjs-modules/mailer 暂时无法ncc打包
// import { MailerModule } from '@nestjs-modules/mailer';
// import { EmailModule } from './email/email.module';
import { MailerModule } from 'nestjs-mailer';
import { EmailModule } from './email/email.module';

// 阿里云—短信相关
import { SmsModule } from './alicloud/sms/sms.module';

// 配置相关
import { ConfigModule, ConfigService } from '@nestjs/config';
// 定时器相关
import { TaskModule } from './task/task.module';
import { ScheduleModule } from '@nestjs/schedule';

// 工作任务队列(结合redis)
// import { AudioModule } from './jobs/audio/audio.module';

// 文件上传模块
import { AlbumModule } from './album/album.module';

// mqtt模块
import { MqttModule } from './mqtt/mqtt.module';

import * as graphqlConfig from './config/graphqlOptions';
import * as emailConfig from './config/emailOptions';
import * as postgresSQLConfig from './config/postgresqlOptions';
import * as systemConfig from './config/systemOptions';
import * as log4Config from './config/log4Options';
import * as redisConfig from './config/redisredisOptions';
import * as fileConfig from './config/fileOptions';
import * as mqttConfig from './config/mqttOptions';

// console.log(mqttConfig.default() )

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [
        emailConfig.default,
        postgresSQLConfig.default,
        graphqlConfig.default,
        systemConfig.default,
        log4Config.default,
        redisConfig.default,
        fileConfig.default,
        mqttConfig.default
      ],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        return config.get('postgresqlOptions');
      },
      inject: [ConfigService],
    }),
    GraphQLModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        return config.get('graphqlOptions');
      },
      inject: [ConfigService],
    }),
    /* 邮箱模块无法ncc打包  */
    // MailerModule.forRootAsync({
    //   useFactory: (config: ConfigService) => {
    //     return config.get('email');
    //   },
    //   inject: [ConfigService],
    // }),
    // EmailModule,

    MailerModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        return {
          config: config.get('emailOptions'),
        };
      },
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(), // 定时任务
    TaskModule,  // 定时任务
    // AudioModule,  // 任务队列(集成redis)
    EmailModule, 
    AuthModule,
    SocketIoModule,
    WsModule,
    UsersModule,
    BookmarkModule,
    PhotoModule,
    SystemsettingModule,
    SmsModule,
    AlbumModule, 
    MqttModule 
  ],
  controllers: [AppController], 
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // 应用
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL }); // 指定那些路由需要经过中间件 *表示通配符
  }
}
