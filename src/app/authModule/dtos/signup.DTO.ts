import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class SignupDTO {
  @IsEmail()
  email : string;

  @IsString()
  username : string;

  @IsStrongPassword({
    minLength : 8,
    minLowercase : 0,
    minNumbers : 0,
    minSymbols : 0, 
    minUppercase : 0,
  })
  password : string;
}