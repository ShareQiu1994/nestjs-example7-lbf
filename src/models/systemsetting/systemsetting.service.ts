import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Systemsetting } from './systemsetting.entity';
import { SystemsettingArgs } from './dto/systemsetting.dto';

@Injectable()
export class SystemsettingService {
  constructor(
    @InjectRepository(Systemsetting)
    private readonly SystemsettingRepository: Repository<Systemsetting>,
  ) {}

  // 获取所有Systemsetting
  async findAll(): Promise<Systemsetting[]> {
    return this.SystemsettingRepository.find();
  }

  // 新增Systemsetting
  async add(SystemsettingArgs: SystemsettingArgs): Promise<Systemsetting> {
    let Systemsetting = Object.assign({}, SystemsettingArgs);
    return this.SystemsettingRepository.save(Systemsetting);
  }

  // 根据id获取指定Systemsetting
  async findId(id: number): Promise<Systemsetting> {
    let SystemsettingRes = await this.SystemsettingRepository.findOne({
      id: id,
    });

    if (SystemsettingRes) return SystemsettingRes;
    this.notFoundIdError(id);
  }

  // 根据id删除指定Systemsetting
  async remove(id: number): Promise<Systemsetting> {
    let Systemsetting = await this.findId(id); // 获取实体并删除
    if (Systemsetting) {
      this.SystemsettingRepository.remove(Systemsetting);
      return Systemsetting;
    }
    this.notFoundIdError(id);
  }

  // 根据id修改指定Systemsetting
  async update(
    id: number,
    SystemsettingArgs: SystemsettingArgs,
  ): Promise<Systemsetting> {
    let Systemsetting = await this.findId(id); // 获取实体并删除
    if (Systemsetting) {
      Systemsetting = Object.assign(Systemsetting, SystemsettingArgs); // 方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target） 参数1:tatgert 参数2:source
      return this.SystemsettingRepository.save(Systemsetting);
    }
    this.notFoundIdError(id);
  }

  // id寻找不到数据 异常处理
  notFoundIdError(id: number) {
    throw new HttpException(
      `抱歉，指定的id:${id}找不到对应的数据！`,
      HttpStatus.FORBIDDEN,
    );
  }
}
