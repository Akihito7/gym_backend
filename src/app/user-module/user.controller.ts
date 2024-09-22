import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { AuthGuard } from "src/guards/auth.guard";

@Controller('users')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  async getUser(@Req() req){
    return this.userService.getUser(req.user.id)
  }
  @Get("metrics")
  async getMetricsUser(@Req() req) {
    return this.userService.getMetricsUser(req.user.id)
  }
}