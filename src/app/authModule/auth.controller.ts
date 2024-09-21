import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignlnDTO } from "./dtos/signln.DTO";
import { JwtService } from "@nestjs/jwt"
import { SignupDTO } from "./dtos/signup.DTO";

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { };

  @Post("signln")
  async signln(@Body() body: SignlnDTO) {
    return this.authService.signln(body)
  }

  @Post("signup")
  async signup(@Body() body : SignupDTO) {
    return this.authService.signup(body)
  }

}