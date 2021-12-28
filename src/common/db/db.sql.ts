import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';

@Injectable()
export class DbService {
  pool: any;
  postgresqlConfig: any;
  constructor(private configService: ConfigService) {
    this.postgresqlConfig = this.configService.get('postgresqlOptions');
    this.pool = new Pool({
      host: this.postgresqlConfig.host,
      user: this.postgresqlConfig.username,
      password: this.postgresqlConfig.password,
      database: this.postgresqlConfig.database,
      max: 20,
      idleTimeoutMillis: 3000,
    });
  }
  query(sql, parameter = []) {
    //每次查询 都是一次新建连接 和断开连接
    return new Promise((resolve, reject) => {
      this.pool.connect((connectErr, client, release) => {
        if (connectErr) {
          console.log(connectErr);
        } else {
          client.query(sql, parameter, (queryErr, res) => {
            release(); // 释放连接（将其返回给连接池）
            if (queryErr) {
              reject(queryErr);
            } else {
              resolve(res);
            }
          });
        }
      });
    });
  }
}
