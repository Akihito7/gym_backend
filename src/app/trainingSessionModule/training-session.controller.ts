import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from "@nestjs/common";
import { TrainingSessionService } from "./training-session.service";
import { AuthGuard } from "src/guards/auth.guard";
import { CreateTrainingSessionDTO } from "./dtos/create-training-session.DTO";

@Controller("training-sessions")
@UseGuards(AuthGuard)
export class TrainingSessionController {
  constructor(private readonly trainingSessionService: TrainingSessionService) { }
  @Get(":userId")
  async getHistoryByUser(@Param("userId") userId: string) {
    return this.trainingSessionService.getHistoryByUser(userId);
  }

  @Post()
  async createTrainingSession(@Body() body: CreateTrainingSessionDTO) {
    return this.trainingSessionService.createTrainingSession(body)
  }

  @Post("exercise")
  async insertExercisesInTrainingSession(@Body()  body : any){
    return this.trainingSessionService.insertExercisesInTrainingSession(body)
  }
  @Post("exercise/series")
  async insertIntoSetsInTrainingSession(@Body() body: any) {
    return this.trainingSessionService.insertIntoSetsInTrainingSession(body)
  }

  @Get('history/:trainingId')
  async getDetailsHistoryTraining(@Param("trainingId", ParseIntPipe) trainingId : number){
    return this.trainingSessionService.getDetailsHistoryTraining(trainingId)
  }

}