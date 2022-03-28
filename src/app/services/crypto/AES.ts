import * as CryptoJS from 'crypto-js';

export class AES {
  constructor() {
  }

  encrypt(data: string, secret: string, salt?: string) {
    if (salt) {
      const iv = CryptoJS.enc.Hex.parse("AT8jTu6lyuG+fg==")
      const key = CryptoJS.enc.Hex.parse(secret)

      return CryptoJS.AES.encrypt(data, key, {iv: iv}).toString()
    }

    return CryptoJS.AES.encrypt(data, secret).toString()
  }

  decrypt(cipher: string | CryptoJS.lib.CipherParams, secret: string, salt?: string) {
    if (salt) {
      const key = CryptoJS.enc.Hex.parse(secret)
      const iv = CryptoJS.enc.Hex.parse("AT8jTu6lyuG+fg==")
      const decrypted = CryptoJS.AES.decrypt(cipher, key, {iv: iv})

      return CryptoJS.enc.Utf8.stringify(decrypted)
    }

    const decrypted = CryptoJS.AES.decrypt(cipher, secret)

    return CryptoJS.enc.Utf8.stringify(decrypted);
  }
}
