import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Pool } from 'pg';

@Injectable()
export class PostgresService implements OnModuleInit, OnModuleDestroy {
  private pool: Pool;

  constructor(private readonly configService: ConfigService) { }

  onModuleInit() {
    this.pool = new Pool({
      host: this.configService.get<string>('HOST'),
      port: this.configService.get<string>('PORT'),
      user: this.configService.get<string>('USER'),
      password: this.configService.get<string>('PASSWORD'),
      database: this.configService.get<string>('DATABASE'),
    })

    console.log('✅ Pool do PostgreSQL inicializado com sucesso');
  }

  async onModuleDestroy() {
    await this.pool.end();
    console.log('🧹 Pool do PostgreSQL fechado');
  }

  async query<T, P = any>(sql: string, params?: P[]): Promise<T> {
    const result = await this.pool.query(sql, params)
    return result.rows
  }
}