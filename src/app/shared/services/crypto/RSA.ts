import {Encoder} from './Encoder';
import {PEM} from './PEM';

export class RSA {
  enc = new TextEncoder()
  dec = new TextDecoder()

  constructor() {
  }

  async importPublicKey(pem: string) {
    const key = Encoder.b64ToAb(pem.replace('-----BEGIN PUBLIC KEY-----', '')
      .replace('-----END PUBLIC KEY-----', ''))

    return await window.crypto.subtle.importKey(
      "spki",
      key,
      {name: "RSA-OAEP", hash: "SHA-256"},
      true,
      ['encrypt']
    );
  }

  async importPrivateKey(pem: string) {
    const key = Encoder.b64ToAb(pem.replace('-----BEGIN PRIVATE KEY-----', '')
      .replace('-----END PRIVATE KEY-----', ''))

    return window.crypto.subtle.importKey(
      "pkcs8",
      key,
      {name: "RSA-OAEP", hash: "SHA-256"},
      true,
      ["decrypt"]
    );
  }

  importNonce(iv: any) {
    return Encoder.b64ToAb(iv);
  }

  async encrypt(data: string, publicKey: CryptoKey, salt?: any) {
    const encoded = this.enc.encode(data)

    if (salt) {
      return await window.crypto.subtle.encrypt(
        {name: "RSA-OAEP", iv: salt},
        publicKey,
        encoded
      )
    }

    return await window.crypto.subtle.encrypt(
      {name: "RSA-OAEP"},
      publicKey,
      encoded
    )
  }

  async decrypt(cipher: ArrayBuffer, privateKey: CryptoKey, salt?: any) {
    if (salt) {
      const decrypted = await window.crypto.subtle.decrypt(
        {name: "RSA-OAEP", iv: salt},
        privateKey,
        cipher
      )

      return this.dec.decode(decrypted)
    }
    const decrypted = await window.crypto.subtle.decrypt(
      {name: "RSA-OAEP"},
      privateKey,
      cipher
    )

    return this.dec.decode(decrypted)
  }

  async generateKeys() {
    const keys = await window.crypto.subtle.generateKey(
      {
        name: "RSA-OAEP",
        modulusLength: 4096,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: "SHA-256"
      },
      true,
      ["encrypt", "decrypt"]
    );

    return {
      privateKey: await PEM.privateKey(keys.privateKey),
      publicKey: await PEM.publicKey(keys.publicKey)
    }
  }

  generateNonce() {
    const array = new Uint32Array(10)

    return Encoder.abToB64(window.crypto.getRandomValues(array))
  }
}
