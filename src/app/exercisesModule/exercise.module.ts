import { Module } from "@nestjs/common";
import { ExerciseController } from "./exercise.controller";
import { ExerciseService } from "./exercise.service";
import { AuthService } from "../authModule/auth.service";
import { EmailService } from "../emailModule/email.service";

@Module({
  controllers: [ExerciseController],
  providers: [ExerciseService, AuthService, EmailService],
})
export class ExerciseModule {}