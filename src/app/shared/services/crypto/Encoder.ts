export class Encoder {
  /**
   * Convert a base-64 string format into an ArrayBuffer object
   * @param b64String <string> base-64 format
   */
  public static b64ToAb(b64String: string) {
    return Uint8Array.from(atob(b64String), c => c.charCodeAt(0));
  }

  /**
   * Convert an ArrayBuffer into a base-64 string format
   * @param buffer <ArrayBuffer>
   */
  public static abToB64(buffer: ArrayBuffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }
}
