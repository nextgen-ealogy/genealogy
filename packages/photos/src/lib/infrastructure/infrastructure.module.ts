import {Module} from "@nestjs/common";
import {PhotosController} from "./photos.controller";
import {ConfigModule} from "@genealogy/config";

@Module({
  controllers: [PhotosController],
  imports: [ConfigModule]
})
export class InfrastructureModule {}
