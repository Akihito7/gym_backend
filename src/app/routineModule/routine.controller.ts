import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { RoutineService } from "./routine.service";
import { AuthGuard } from "src/guards/auth.guard";


@Controller("routines")
export class RoutineController {
  constructor(private readonly routineService: RoutineService) { }
  @Get()
  @UseGuards(AuthGuard)
  async getManyRoutinesByUser(@Req() req) {
    const userId = req.user.id;
    return this.routineService.getManyRoutinesByUser(userId)
  }
}