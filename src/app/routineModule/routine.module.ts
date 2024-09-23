import { Module } from "@nestjs/common";
import { RoutineController } from "./routine.controller";
import { RoutineService } from "./routine.service";
import { AuthService } from "../authModule/auth.service";
import { EmailService } from "../emailModule/email.service";

@Module({
  controllers: [RoutineController],
  providers: [RoutineService, AuthService,EmailService],
})
export class RoutineModule { }