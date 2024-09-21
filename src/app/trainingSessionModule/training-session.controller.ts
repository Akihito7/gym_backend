import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { TrainingSessionService } from "./training-session.service";
import { AuthGuard } from "src/guards/auth.guard";
import { CreateTrainingSessionDTO } from "./dtos/create-training-session.DTO";

@Controller("training-sessions")
export class TrainingSessionController {
  constructor(private readonly trainingSessionService: TrainingSessionService) { }
  @Get(":userId")
  @UseGuards(AuthGuard)
  async getHistoryByUser(@Param("userId") userId: string) {
    return this.trainingSessionService.getHistoryByUser(userId);
  }

  @Post()
  async createTrainingSession(@Body() body: CreateTrainingSessionDTO) {
    return this.trainingSessionService.createTrainingSession(body)
  }
}