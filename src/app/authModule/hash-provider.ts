export abstract class HashProvider {
  abstract compare(password: string, bufferPassword: string): Promise<boolean>;
}
