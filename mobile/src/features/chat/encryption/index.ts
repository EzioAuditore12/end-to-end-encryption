import { createDiffieHellman, DiffieHellman } from "react-native-nitro-crypto";
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
}

export const encryption = new Encryption();
