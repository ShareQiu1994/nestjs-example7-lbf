import { Module } from '@nestjs/common';
import { SystemsettingService } from './systemsetting.service';
import { SystemsettingController } from './systemsetting.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemsettingResolver } from './systemsetting.resolver';
import { Systemsetting } from './systemsetting.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([Systemsetting]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [SystemsettingResolver, SystemsettingService],
  controllers: [SystemsettingController],
})
export class SystemsettingModule {}
