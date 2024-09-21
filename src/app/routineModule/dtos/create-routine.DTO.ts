import { IsString } from "class-validator";


export class CreateRoutineDTO {
  @IsString()
  routineName : string;
}