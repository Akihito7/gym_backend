import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { DatabaseService } from "./database.service";
import { Pool } from 'pg';

@Injectable()
export class PgService extends DatabaseService implements OnModuleInit, OnModuleDestroy {

  private pool: Pool;

  onModuleInit() {
    this.pool = new Pool({
      host: '192.168.1.53',
      port: 5432,
      user: 'postgres',
      password: 'root',
      database: 'gym',
    })

    console.log('✅ Pool do PostgreSQL inicializado com sucesso');
  }

  async onModuleDestroy() {
    await this.pool.end();
    console.log('🧹 Pool do PostgreSQL fechado');
  }

  async query(sql: string, params?: any[]): Promise<any> {
    const result = await this.pool.query(sql, params)
    return result.rows
  }
}