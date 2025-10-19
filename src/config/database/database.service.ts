export abstract class DatabaseService {
  abstract query<T>(sql: string, params: any[]): Promise<T[]>
}