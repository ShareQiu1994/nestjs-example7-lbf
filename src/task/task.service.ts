import { Injectable, Logger } from '@nestjs/common';
import { Cron, Interval, Timeout } from '@nestjs/schedule';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);
  
  /* 详细参数请参考 官网http://crontab.org/ */
  /* 
      minute         0-59
      hour           0-23
      day of month   0-31
      month          0-12 (or names, see below)
      day of week    0-7 (0 or 7 is Sun, or use names)
  */

  // @Cron('45 * * * * *') // 每天中午12点 晚上12点执行一次

  @Cron('0 0 0,12 * * 1-7')
  handleCron() {
    this.logger.debug('每天中午12点、晚上12点执行一次定时任务');
  }

  // @Cron('45 * * * * *') // 每隔45秒执行一次
  // handleCron() {
  //   this.logger.debug('Called when the second is 45');
  // }

  // @Interval(10000) // 每隔10秒执行一次 
  // handleInterval() {
  //   this.logger.debug('Called every 10 seconds'); 
  // }

  // @Timeout(5000)   // 5秒后执行 只执行一次
  // handleTimeout() {
  //   this.logger.debug('Called once after 5 seconds');
  // }
}
