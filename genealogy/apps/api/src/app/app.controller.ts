import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import neo4j from 'neo4j-driver';

export type Neo4jScheme =
  | 'neo4j'
  | 'neo4j+s'
  | 'neo4j+scc'
  | 'bolt'
  | 'bolt+s'
  | 'bolt+scc';

export interface Neo4jConfig {
  scheme: Neo4jScheme;
  host: string;
  port: number | string;
  username: string;
  password: string;
  database?: string;
}

@Controller()
export class AppController {
  constructor(private readonly configService: ConfigService) {
    this.testNeo4j();
  }

  async testNeo4j() {
    const NEO4J_USER = this.configService.get<string>('NEO4J_USER');
    const NEO4J_PASSWORD = this.configService.get<string>('NEO4J_PASSWORD');
    const NEO4J_HOST = this.configService.get<string>('NEO4J_HOST');

    const driver = neo4j.driver(
      NEO4J_HOST,
      neo4j.auth.basic(NEO4J_USER, NEO4J_PASSWORD)
    );

    // Verify the connection details or throw an Error
    await driver.verifyConnectivity();

    const person1Name = 'Alice';
    const person2Name = 'David';

    const session = driver.session();
    const writeQuery = `MERGE (p1:Person { name: $person1Name })
                       MERGE (p2:Person { name: $person2Name })
                       MERGE (p1)-[:KNOWS]->(p2)
                       RETURN p1, p2`;

    // Write transactions allow the driver to handle retries and transient errors
    const writeResult = await session.writeTransaction((tx) =>
      tx.run(writeQuery, { person1Name, person2Name })
    );
    console.log(writeResult)
  }

  @Get()
  getData() {
    return 'ok';
  }
}
