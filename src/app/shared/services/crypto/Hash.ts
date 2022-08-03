import {Encoder} from './Encoder';
import * as CryptoJS from 'crypto-js';

export class Hash {
  constructor() {
  }

  async SHA512(data: any, isString?: boolean) {
    if (!isString) {
      const digest = await window.crypto.subtle.digest("SHA-512", data)
      return Encoder.abToB64(digest)
    }

    const wordDigest = CryptoJS.SHA512(data)
    return CryptoJS.enc.Base64.stringify(wordDigest)
  }

  async SHA256(data: any, isString?: boolean) {
    if (!isString) {
      const digest = await window.crypto.subtle.digest("SHA-256", data)
      return Encoder.abToB64(digest)
    }

    const wordDigest = CryptoJS.SHA256(data)
    return CryptoJS.enc.Base64.stringify(wordDigest)
  }

}
