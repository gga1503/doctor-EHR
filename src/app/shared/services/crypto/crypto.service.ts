import {Injectable} from '@angular/core';
import {AES} from './AES';
import {ECDH} from './ECDH';
import {Hash} from './Hash';
import {RSA} from './RSA';
import {PEM} from './PEM';

@Injectable({
  providedIn: 'root'
})

export class CryptoService {
  AES: AES = new AES();
  RSA: RSA = new RSA();
  Hash: Hash = new Hash();
  ECDH: ECDH = new ECDH();
  PEM: PEM = new PEM();
}
