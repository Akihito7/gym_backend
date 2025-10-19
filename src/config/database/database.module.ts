import { Global, Module } from "@nestjs/common";
import { DatabaseService } from "./database.service";
import { PostgresJsService } from "./postgres.service";

@Global()
@Module({
  providers: [{
    provide: DatabaseService,
    useClass: PostgresJsService
  }],
  exports: [DatabaseService]
})
export class DatabaseModule { }