import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { AuthGuard } from "src/guards/auth.guard";

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get("metrics")
  @UseGuards(AuthGuard)
  async getMetricsUser(@Req() req) {
    return this.userService.getMetricsUser(req.user.id)
  }
}