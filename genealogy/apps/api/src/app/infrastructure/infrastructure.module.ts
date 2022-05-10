import { Module } from "@nestjs/common";
import { ApiModule } from "./api/api.module";
import { ElasticsearchModule } from "./elasticsearch/elasticsearch.module";
import { Neo4jModule } from "./neo4j/neo4j.module";

@Module({
    imports: [ElasticsearchModule, Neo4jModule, ApiModule]
})
export class InfrastructureModule {

}