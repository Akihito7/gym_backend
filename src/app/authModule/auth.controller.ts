import { Body, Controller, Get, Param, Patch, Post, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignlnDTO } from "./dtos/signln.DTO";
import { SignupDTO } from "./dtos/signup.DTO";
import { ResetPasswordDTO } from "./dtos/reset-password.DTO";

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

  @Get("verify-token/:token")
  async verfifyToken(@Param("token") token : string){
    return this.authService.verifyToken(token)
  }

  @Patch("reset-password/:token")
  async resetPassword(
    @Param("token") token : string,
    @Body() body : ResetPasswordDTO
  ){
    return this.authService.resetPassword(token, body);
  } 

  @Get("forget-password/:email")
  async forgetPassword(@Param("email") email : string, @Res() res){
    return this.authService.forgetPassword(email);
  }

  @Get("forget-password/redirect/:token")
  async forgetPasswordRedirect(@Param("token") token : string, @Res() res){
    res.redirect(`akihitogym://reset-password/${token}`)
  }

}