import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { SignlnDTO } from "./dtos/signln.DTO";
import { dbConnection } from "src/config/db";
import { JwtService } from "@nestjs/jwt";
import { hash, compare } from "bcrypt";
import { SignupDTO } from "./dtos/signup.DTO";

@Injectable()
export class AuthService {

  constructor(private readonly jwtService: JwtService) { };
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
      const isValidToken = this.jwtService.verify(verifyToken)
      return isValidToken
    } catch (error) {
      throw new BadRequestException("Token inválido")
    }
  }

  verifyToken(token : string){
    try {
      this.jwtService.verify(token);
      return {
        isValid : true
      }
    } catch (error) {
      throw new BadRequestException("Token inválido")
    }
  }
}