import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ElasticsearchService } from "./elasticearch.service";

@Module({
    imports: [ConfigModule.forRoot()],
    providers: [
        ElasticsearchService
    ]
})
export class ElasticsearchModule {

}