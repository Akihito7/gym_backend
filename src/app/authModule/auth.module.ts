import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"),
        signOptions : {
          expiresIn : configService.get<number>("EXPIRES_IN")
        }
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }