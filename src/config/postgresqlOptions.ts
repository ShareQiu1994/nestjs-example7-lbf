/*
 * @version: 1.0.0
 * @Author: liubofang<421419567@qq.com>
 * @Date: 2020-10-07 09:23:28
 * @LastEditTime: 2020-12-05 16:49:40
 */
// 实体相关
import { Systemsetting } from '../models/systemsetting/systemsetting.entity';
import { Bookmark } from '../models/bookmark/bookmark.entity';
import { Photo } from '../models/photo/photo.entity';
import { Users } from '../models/users/users.entity';
import { registerAs } from '@nestjs/config'; // 配置命名空间

export default registerAs('postgresqlOptions', () => ({
  type: 'postgres',
  host: process.env.POSTGRESSQLCONFIG_HOST || '127.0.0.1',
  port: Number(process.env.POSTGRESSQLCONFIG_PORT) || 5432,
  username: process.env.POSTGRESSQLCONFIG_USERNAME || 'postgres',
  password: process.env.POSTGRESSQLCONFIG_PASSWORD || '123456',
  database: process.env.POSTGRESSQLCONFIG_DATABASE || 'lbf',
  synchronize: true,
  entities: [Systemsetting, Bookmark,Photo,Users],
}));
