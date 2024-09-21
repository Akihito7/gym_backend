import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { TrainingSessionService } from "./training-session.service";
import { AuthGuard } from "src/guards/auth.guard";

@Controller("training-sessions")
export class TrainingSessionController {
  constructor(private readonly trainingSessionService: TrainingSessionService) { }
  @Get(":userId")
  @UseGuards(AuthGuard)
  async getHistoryByUser(@Param("userId") userId: string) {
    return this.trainingSessionService.getHistoryByUser(userId);
  }
}