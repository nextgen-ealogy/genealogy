import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Neo4jService } from "./service/neo4j.service";

@Module({
    imports: [ConfigModule.forRoot()],
    providers: [Neo4jService]
})
export class Neo4jModule {

}