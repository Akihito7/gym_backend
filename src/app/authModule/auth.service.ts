import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { SignlnDTO } from "./dtos/signln.DTO";
import { dbConnection } from "src/config/db";
import { JwtService } from "@nestjs/jwt";
import { hash, compare } from "bcrypt";
import { SignupDTO } from "./dtos/signup.DTO";
import { ResetPasswordDTO } from "./dtos/reset-password.DTO";
import { ConfigService } from "@nestjs/config";
import { NotFoundError } from "rxjs";
import { EmailService } from "../emailModule/email.service";

@Injectable()
export class AuthService {

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService
  ) { };
  async signln(data: SignlnDTO) {
    const [user] = await dbConnection`SELECT * FROM users WHERE email = ${data.email}`;
    if (!user) throw new UnauthorizedException("Email e/ou senha inválidos");
    const passwordMatched = await compare(data.password, user.password);
    if (!passwordMatched) throw new UnauthorizedException("Email e/ou senha inválidos");
    const token = await this.generateToken(String(user.id));
    return { token }
  }

  async signup(data: SignupDTO) {
    const [emailAlreadyInUse] = await dbConnection`SELECT * FROM users WHERE email = ${data.email}`
    if (emailAlreadyInUse) throw new ConflictException("Email já em uso!");
    const [username] = await dbConnection`SELECT * FROM users WHERE username = ${data.username}`
    if (username) throw new ConflictException("Username já em uso!");
    const passwordHashed = await hash(data.password, 8);
    await dbConnection`
    INSERT INTO users (email, username, password, created_at) 
    VALUES (${data.email}, ${data.username}, ${passwordHashed}, now())
  `;
  }

  async generateToken(userId: string) {
    return this.jwtService.sign({}, {
      subject: userId
    })
  }

  checkToken(token: string) {
    const verifyToken = String(token).split(" ")[1]
    try {
      const isValidToken = this.jwtService.verify(verifyToken, {
        secret : this.configService.get<string>("JWT_SECRET")
      })
      return isValidToken
    } catch (error) {
      throw new BadRequestException("Token inválido")
    }
  }

  verifyToken(token: string) {
    try {
      this.jwtService.verify(token);
      return {
        isValid: true
      }
    } catch (error) {
      throw new BadRequestException("Token inválido")
    }
  }

  async forgetPassword(email: string) {
    const [user] = await dbConnection`SELECT * FROM users where email = ${email}`
    if (!user) throw new NotFoundException("Usuário não encontrado.");
    const token = this.jwtService.sign({}, {
      secret: this.configService.get<string>("JWT_FORGET_PASSWORD"),
      audience: "reset-password",
      subject: String(user.id),
      expiresIn: "5m"
    });

    try {
      const resetLink = `https://cda3-2804-14d-8e8d-4fa9-70f7-162d-aec0-c397.ngrok-free.app/auth/forget-password/redirect/${token}`;
      await this.emailService.sendEmail({
        to: email,
        subject: `Troque sua senha`,
        text: `Para trocar sua senha, acesse o seguinte link: ${resetLink}`, 
      });
    } catch (error) {
      throw new BadRequestException("Não foi possível enviar o e-mail");
    }
  }

  async resetPassword(token: string, data: ResetPasswordDTO) {
    try {
      const { sub: userId } = this.jwtService.verify(token, {
        secret: this.configService.get<string>("JWT_FORGET_PASSWORD"),
        audience: "reset-password"
      });
      const hashedPassword = await hash(data.password, 8)
      await dbConnection`UPDATE users SET password = ${hashedPassword} where id = ${userId}`
    } catch (error) {
      throw new BadRequestException("Token inválido")
    }
  }
}