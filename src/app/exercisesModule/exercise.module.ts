import { Module } from "@nestjs/common";
import { ExerciseController } from "./exercise.controller";
import { ExerciseService } from "./exercise.service";
import { AuthService } from "../authModule/auth.service";
import { EmailService } from "../emailModule/email.service";
import { ExerciseRepository } from "./exercise.repository";

@Module({
  controllers: [ExerciseController],
  providers: [ExerciseService, AuthService, EmailService, ExerciseRepository],
})
export class ExerciseModule { }