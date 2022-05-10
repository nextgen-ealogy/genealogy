import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import neo4j from 'neo4j-driver';
import { Driver, QueryResult } from 'neo4j-driver-core';

@Injectable()
export class Neo4jService {
  private driver: Driver;
  constructor(private readonly configService: ConfigService) {
    const NEO4J_USER = this.configService.get<string>('NEO4J_USER');
    const NEO4J_PASSWORD = this.configService.get<string>('NEO4J_PASSWORD');
    const NEO4J_HOST = this.configService.get<string>('NEO4J_HOST');

    this.driver = neo4j.driver(
      NEO4J_HOST,
      neo4j.auth.basic(NEO4J_USER, NEO4J_PASSWORD)
    );

    // Verify the connection details or throw an Error
    this.driver.verifyConnectivity();
  }

  public addLink(idFrom: string, relation: string, idTo: string): Promise<QueryResult> {
    const session = this.driver.session();
      const writeQuery = `MERGE (p1:Person { id: $idFrom })
                       MERGE (p2:Person { id: $idTo })
                       MERGE (p1)-[:$relation]->(p2)
                       RETURN p1, p2`;

      return session.writeTransaction((tx) =>
        tx.run(writeQuery, { idFrom, relation, idTo })
      );
  }
}
