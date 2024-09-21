import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { AuthGuard } from "src/guards/auth.guard";

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  @UseGuards(AuthGuard)
  async getUser(@Req() req){
    return this.userService.getUser(req.user.id)
  }
  
  @Get("metrics")
  @UseGuards(AuthGuard)
  async getMetricsUser(@Req() req) {
    return this.userService.getMetricsUser(req.user.id)
  }
}