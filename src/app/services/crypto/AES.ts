import * as CryptoJS from 'crypto-js';

export class AES {
  constructor() {
  }

  encrypt(data: string, key: string) {
    return CryptoJS.AES.encrypt(data, key).toString()
  }

  decrypt(cipher: string, key: string) {
    const decrypted = CryptoJS.AES.decrypt(cipher, key)
    return CryptoJS.enc.Utf8.stringify(decrypted);
  }
}
