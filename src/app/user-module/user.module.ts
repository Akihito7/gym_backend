import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { EmailService } from "../emailModule/email.service";

@Module({
  controllers: [UserController],
  providers: [UserService, EmailService],
})
export class UserModule { }