import { InjectQueue } from '@nestjs/bull';
import { Controller, Post } from '@nestjs/common';
import { Queue } from 'bull';

@Controller('audio')
export class AudioController {
  constructor(@InjectQueue('audio') private readonly audioQueue: Queue) {}

  @Post('transcode')  
  async transcode() {
    await this.audioQueue.add( 
      'transcode', // 队列名
      {  // 数据
        file: 'audio.mp3',
      },
      { delay: 1000 },  //配置项 延时时间等 
    );
  }
}
