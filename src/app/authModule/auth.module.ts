import { Global, Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { EmailModule } from "../emailModule/email.module";
import { PasswordService } from "./password.service";
import { HashProvider } from "./hash-provider";
import { BcryptService } from "./bcrypt.service";

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"),
        signOptions: {
          expiresIn: configService.get<number>("EXPIRES_IN")
        }
      }),
    }),
    EmailModule
  ],
  controllers: [AuthController],
  providers: [AuthService, PasswordService,
    {
      provide: HashProvider,
      useClass: BcryptService
    }],
  exports: [PasswordService]
})
export class AuthModule { }