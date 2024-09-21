import { IsString } from "class-validator";

export class CreateTrainingSessionDTO {

  @IsString()
  userId : string;
  @IsString()
  routineId : string;
  @IsString()
  duration : string;
}