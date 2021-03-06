import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { InfrastructureModule } from './infrastructure/infrastructure.module';

@Module({
  imports: [ConfigModule.forRoot(), InfrastructureModule],
})
export class AppModule {}
