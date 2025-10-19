import { Injectable } from "@nestjs/common";
import { compare } from "bcrypt"
import { HashProvider } from "./hash-provider";

@Injectable()
export class BcryptService extends HashProvider {
  async compare(password: string, bufferPassword: string): Promise<boolean> {
    return compare(password, bufferPassword)
  }
}