import {
  createCipheriv,
  createDecipheriv,
  createDiffieHellman,
  createHash,
  DiffieHellman,
  randomBytes,
} from "react-native-nitro-crypto";
import { env } from "@/env";
import { Buffer } from "react-native-nitro-buffer";

export class Encryption {
  gn: DiffieHellman;
  publicKey: string;

  constructor() {
    const pemParams = env.EXPO_PUBLIC_DH_GN;
    const base64String = pemParams;
    const derBytes = Buffer.from(base64String, "base64");
    this.gn = createDiffieHellman(derBytes);
    this.publicKey = this.gn.generateKeys("hex") as string;
  }

  public generatePublicKey(): string {
    // console.log("Public key (from class): ", this.publicKey);
    return this.publicKey;
  }

  public generatePrivateKey(): string {
    const privateKey = this.gn.getPrivateKey("hex") as string;
    // console.log("Private key (from class): ", privateKey);
    return privateKey;
  }

  /**
   * @returns generates final key user for both encryption and decryption
   */
  public generateAESKey(receiverPublicKey: string) {
    const sharedSecret = this.gn.computeSecret(
      Buffer.from(receiverPublicKey, "hex"),
      "hex",
    );

    const aesKey = createHash("sha256")
      .update(sharedSecret)
      .digest("hex") as string;
    console.log("AES KEY: ", aesKey);
    return aesKey;
  }

  public encrypt(aesKey: string, text: string): string {
    const bufferAES = Buffer.from(aesKey, "hex");
    const iv = randomBytes(16);

    const cipher = createCipheriv("aes-256-cbc", bufferAES, iv);

    // main encryption
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");

    const cipherText = `${iv.toString("hex")}:${encrypted}`;
    console.log("Cipher text: ", cipherText);
    return cipherText as string;
  }

  public decrypt(aesKey: string, cipherText: string) {
    const bufferAes = Buffer.from(aesKey, "hex");
    const [iv, cipher] = cipherText.split(":");

    const ivBuf = Buffer.from(iv, "hex");

    const decrypter = createDecipheriv("aes-256-cbc", bufferAes, ivBuf);
    let text = decrypter.update(cipher, "hex", "utf8");
    text += decrypter.final("utf8");

    console.log("Decrypted text: ", text);

    return text;
  }
}

export const encryption = new Encryption();
