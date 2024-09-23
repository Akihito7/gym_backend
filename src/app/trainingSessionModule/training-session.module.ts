import { Module } from "@nestjs/common";
import { TrainingSessionController } from "./training-session.controller";
import { TrainingSessionService } from "./training-session.service";
import { AuthService } from "../authModule/auth.service";
import { EmailService } from "../emailModule/email.service";

@Module({
  controllers: [TrainingSessionController],
  providers: [TrainingSessionService, AuthService, EmailService]
})
export class TrainingSessionModule { }