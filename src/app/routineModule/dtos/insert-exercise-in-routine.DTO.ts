import { IsString } from "class-validator";

export class InsertExerciseInRoutineDTO {
  @IsString()
  routineId : string;
  @IsString()
  exerciseId : string;
  @IsString()
  order : string;
}