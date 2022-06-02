import {Encoder} from './Encoder';
import {PEM} from './PEM';
import {Hash} from './Hash'

export class ECDH {

  constructor() {
  }

  /**
   * Generate ECDH public key object.
   * @param pem <string> pem format public key.
   * @param curveType <string> ECDH curve type. ```P-256```, ```P-384```, ```P-521```.
   */
  async importPublicKey(pem: string, curveType?: string) {
    const key = Encoder.b64ToAb(pem.replace('-----BEGIN PUBLIC KEY-----', '')
      .replace('-----END PUBLIC KEY-----', ''))

    return await window.crypto.subtle.importKey(
      "spki",
      key,
      {name: "ECDH", namedCurve: curveType || 'P-256'},
      true,
      []
    );
  }

  /**
   * Generate ECDH private key object.
   * @param pem <string> pem format private key.
   * @param curveType <string> ECDH curve type. ```P-256```, ```P-384```, ```P-521```.
   */
  async importPrivateKey(pem: string, curveType?: string) {
    const key = Encoder.b64ToAb(pem.replace('-----BEGIN PRIVATE KEY-----', '')
      .replace('-----END PRIVATE KEY-----', ''))

    return window.crypto.subtle.importKey(
      "pkcs8",
      key,
      {name: "ECDH", namedCurve: curveType || 'P-256'},
      false,
      ["deriveKey", "deriveBits"]
    );
  }

  /**
   * Return a 256-bit (16-length chars) hashed ECDH shared secret key
   * @param privateKey
   * @param publicKey
   */
  async computeSecret(privateKey: any, publicKey: any) {
    const sharedSecret = await window.crypto.subtle.deriveBits(
      {name: "ECDH", public: publicKey},
      privateKey,
      256
    )

    const hash = new Hash()
    return await hash.SHA512(Encoder.abToB64(sharedSecret), true)
  }

  async generateKeys() {
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

  async generateSessionKey(master_key: string, hash: string) {
    const temp = master_key.concat(hash)

    return CryptoJS.SHA512(temp);
  }

  async testKeys() {
    const patient: any = {
      ecdh_private_key: "MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgw+rDCZnzRCNqqhLatYv2LVlAMQHrSmpbkpadE5jfbrahRANCAATyiIVnvpjAcF1diQsyCPK23opmj74dM57iRIyJRgu9N0+PKS+q7qF/+xtxrnBv+x8hKT2vOVwsSVVyEbLRDbFH",
      ecdh_public_key: "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE8oiFZ76YwHBdXYkLMgjytt6KZo++HTOe4kSMiUYLvTdPjykvqu6hf/sbca5wb/sfISk9rzlcLElVchGy0Q2xRw=="
    }, hospital: any = {
      ecdh_public_key: "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEFSBe8ZNWHS5mvX5+LyY6/epeROby/GvR1RHenybx6tGTMB+RDZcIqAqkZxtQFVx7Faj55CFAlD7Df7mPbgAa8g==",
      ecdh_private_key: "MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgPn9GAA7kBzO+swtJuPjBvh4Kwbl5gPSMbkGEBY8tNbShRANCAAQVIF7xk1YdLma9fn4vJjr96l5E5vL8a9HVEd6fJvHq0ZMwH5ENlwioCqRnG1AVXHsVqPnkIUCUPsN/uY9uABry"
    }

    patient.ecdh = {
      private_key: await this.importPrivateKey(patient.ecdh_private_key),
      public_key: await this.importPublicKey(patient.ecdh_public_key)
    }

    hospital.ecdh = {
      private_key: await this.importPrivateKey(hospital.ecdh_private_key),
      public_key: await this.importPublicKey(hospital.ecdh_public_key)
    }

    patient.ecdh.secret_key = await this.computeSecret(patient.ecdh.private_key, hospital.ecdh.public_key)
    hospital.ecdh.secret_key = await this.computeSecret(hospital.ecdh.private_key, patient.ecdh.public_key)

    console.log("Key is symmetric:", patient.ecdh.secret_key == hospital.ecdh.secret_key)
    console.log('patient', patient)
    console.log('hospital', hospital)
  }
}
