import {Encoder} from './Encoder';

export class PEM {
  constructor() {
  }

  public static async publicKey(key: any) {
    const exported = await window.crypto.subtle.exportKey(
      "spki",
      key
    )
    const base64Key = Encoder.abToB64(exported)
    return `-----BEGIN PUBLIC KEY-----${base64Key}-----END PUBLIC KEY-----`
  }

  public static async privateKey(key: any) {
    const exported = await window.crypto.subtle.exportKey(
      "pkcs8",
      key
    )
    const base64Key = Encoder.abToB64(exported)
    return `-----BEGIN PRIVATE KEY-----${base64Key}-----END PRIVATE KEY-----`;
  }
}
