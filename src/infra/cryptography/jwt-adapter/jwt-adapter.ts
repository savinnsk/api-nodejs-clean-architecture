import jwt from "jsonwebtoken";
import { Encrypter } from "../../../domain/cryptography/encrypter";
import { Decrypter } from "@/domain/cryptography/decrypter";

export class JwtAdapter implements Encrypter, Decrypter {
  private readonly secret: string;
  constructor(secret: string) {
    this.secret = secret;
  }

  async decrypt(value: string): Promise<string> {
    const accessToken = await jwt.verify(value, this.secret);
    return accessToken as string;
  }

  async encrypt(value: string): Promise<string> {
    const accessToken = await jwt.sign({ id: value }, this.secret);
    return accessToken;
  }
}
