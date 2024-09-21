import { IsNumber, IsString } from "class-validator";

export class InsertExerciseInRoutineDTO {
  @IsNumber()
  routineId : number;
  @IsNumber()
  exerciseId : number;
  @IsNumber()
  order : number;
}