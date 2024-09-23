import { IsStrongPassword } from "class-validator";

export class ResetPasswordDTO {
  @IsStrongPassword({
    minLength : 8,
    minLowercase : 0,
    minNumbers : 0,
    minSymbols : 0,
    minUppercase : 0
  })
  password : string
}