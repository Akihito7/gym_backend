import { Module } from "@nestjs/common";
import { TrainingSessionController } from "./training-session.controller";
import { TrainingSessionService } from "./training-session.service";
import { AuthService } from "../authModule/auth.service";

@Module({
  controllers: [TrainingSessionController],
  providers: [TrainingSessionService, AuthService]
})
export class TrainingSessionModule { }