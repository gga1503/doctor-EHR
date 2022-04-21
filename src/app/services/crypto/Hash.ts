import {Encoder} from './Encoder';

export class Hash {
  constructor() {
  }

  async SHA512(buffer: ArrayBuffer) {
    const digest = await window.crypto.subtle.digest("SHA512", buffer)
    return Encoder.abToB64(digest)
  }
}
