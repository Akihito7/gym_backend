import { IsNumber, isNumber, IsString } from "class-validator";

export class CreateTrainingSessionDTO {

  @IsNumber()
  userId : number;
  @IsNumber()
  routineId : number;
  @IsString()
  duration : string;
}