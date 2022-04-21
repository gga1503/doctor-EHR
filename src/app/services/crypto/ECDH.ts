import {Encoder} from './Encoder';
import {PEM} from './PEM';

export class ECDH {

  constructor() {
  }

  /**
   * Generate ECDH public key object.
   * @param pem <string> pem format public key.
   * @param curveType <string> ECDH curve type. ```P-256```, ```P-384```, ```P-521```.
   */
  async importPublicKey(pem: string, curveType: string) {
    const key = Encoder.b64ToAb(pem.replace('-----BEGIN PUBLIC KEY-----', '')
      .replace('-----END PUBLIC KEY-----', ''))

    return await window.crypto.subtle.importKey(
      "spki",
      key,
      {name: "ECDH", namedCurve: curveType},
      true,
      []
    );
  }

  /**
   * Generate ECDH private key object.
   * @param pem <string> pem format private key.
   * @param curveType <string> ECDH curve type. ```P-256```, ```P-384```, ```P-521```.
   */
  async importPrivateKey(pem: string, curveType: string) {
    const key = Encoder.b64ToAb(pem.replace('-----BEGIN PRIVATE KEY-----', '')
      .replace('-----END PRIVATE KEY-----', ''))

    return window.crypto.subtle.importKey(
      "pkcs8",
      key,
      {name: "ECDH", namedCurve: curveType},
      false,
      ["deriveKey", "deriveBits"]
    );
  }

  /**
   * Compute ECDH shared secret key.
   * @param privateKey <CryptoKey> ECDH private key.
   * @param publicKey <CryptoKey> ECDH public key.
   */
  async computeSecret(privateKey: any, publicKey: any) {
    const sharedSecret = await window.crypto.subtle.deriveBits(
      {name: "ECDH", public: publicKey},
      privateKey,
      256
    )
    return Encoder.abToB64(sharedSecret);
  }

  async generateKeys(){
    const keys = await window.crypto.subtle.generateKey(
      {
        name: "ECDH",
        namedCurve: "P-256"
      },
      true,
      ["deriveKey", "deriveBits"]
    )

    return {
      privateKey: await PEM.privateKey(keys.privateKey),
      publicKey: await PEM.publicKey(keys.publicKey)
    }
  }
}
