import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { Neo4jModule } from './neo4j/neo4j.module';
import { ElasticsearchModule } from './elasticsearch/elasticsearch.module';

@Module({
  imports: [ConfigModule.forRoot(), Neo4jModule, ElasticsearchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
