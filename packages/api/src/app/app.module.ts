import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {PhotosModule} from "@genealogy/photos";

@Module({
  imports: [PhotosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
