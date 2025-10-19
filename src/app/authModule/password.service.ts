import { Injectable } from "@nestjs/common";
import { HashProvider } from "./hash-provider";


@Injectable()
export class PasswordService {

  constructor(private readonly hashProvider: HashProvider) { }
  
  async compare(password: string, bufferPassword: string) {
    return this.hashProvider.compare(password, bufferPassword)
  }
}