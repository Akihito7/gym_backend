import { Injectable, OnModuleInit } from "@nestjs/common";
import { DatabaseService } from "./database.service";
import postgres from "postgres";

@Injectable()
export class PostgresJsService extends DatabaseService implements OnModuleInit {
  private sql: any;

  onModuleInit() {
    this.sql = postgres({
      host: '192.168.1.53',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'gym',
    });
  }

  async query<T>(sql: string, params?: any[]): Promise<T[]> {
    return this.sql.unsafe(sql, params);
  }
}
