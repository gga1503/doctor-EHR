import {Component, OnInit} from '@angular/core';
import {CryptoService} from '../../../shared/services/crypto/crypto.service';

@Component({
  selector: 'app-records-create',
  templateUrl: './records-create.component.html',
  styleUrls: ['./records-create.component.scss']
})
export class RecordsCreateComponent implements OnInit {

  patient = {}

  diseases = [
    {
      name: "Covid19",
      records: [
        {
          "_id": "62605e04c1942e0a3e614745",
          "data": {
            "disease_id": "62605a4ba5d4a874cfe0661a",
            "diagnose": "Sore Throat",
            "bc_tx_address": "tx_12345",
            "model": "Record",
            "_id": "62605e040e62c921a635e3a1"
          },
          "id": "719544f76c0e8540b96621228764377852ecafc1f12aac2c3bb25124f33d6cb6"
        },
        {
          "_id": "62606005c1942e0a3e61474a",
          "data": {
            "disease_id": "62605a4ba5d4a874cfe0661a",
            "diagnose": "Fever",
            "bc_tx_address": "tx_12345",
            "model": "Record",
            "_id": "62606005ad9ee6272718a477"
          },
          "id": "9ac168b7986c5bf48d02ff8d78733ee101cad8714f456ef0acd55a1f302b5e19"
        },
        {
          "_id": "62606041c1942e0a3e61474f",
          "data": {
            "disease_id": "62605a4ba5d4a874cfe0661a",
            "diagnose": "Sore throat & Fever",
            "bc_tx_address": "tx_12345",
            "model": "Record",
            "_id": "62606041efaa4561ee8a31ff"
          },
          "id": "c6e47f524d9339e8d3463dd20904027e5a47dc702b92eb0bc2e31b15428ff1fd"
        },
        {
          "_id": "6261af14453121e6527c09b9",
          "data": {
            "disease_id": "62605a4ba5d4a874cfe0661a",
            "diagnose": "Omicron type",
            "bc_tx_address": "tx_12345",
            "date": "2022-04-21T19:22:28.585Z",
            "model": "Record",
            "_id": "6261af12619902af5d273e9e"
          },
          "id": "d23ee16e192d3d648b2ac19f0a77f04d1e6019e73c0bf34aa84dc5113705c6ae"
        },
        {
          "_id": "6261afeb453121e6527c09be",
          "data": {
            "disease_id": "62605a4ba5d4a874cfe0661a",
            "diagnose": "Delta type",
            "bc_tx_address": "tx_12345",
            "model": "Record",
            "_id": "6261afe9eb6568270e1adf40"
          },
          "id": "be6be6a130be49a019647b805636c8a4e1d1d0c2f21942f4af94ed79373fa9f0"
        }
      ]
    }
  ]

  // diseases[0].name -> kalo mau akses nama
  // diseases[0].records[i].data.diagnose
  sampleData = {
    patients: [
      {
        "_id": 1,
        "name": "Ian",
        "ecdh": {
          "privateKey": "-----BEGIN PRIVATE KEY-----MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgabBxw89huKLNfTLGpMFX1dU58m0F2Y5l5fcIwkbanCahRANCAARMVLWuHS+S+nvJqukHWQqSuDmuVK4H9M31f7xbnxM/DijX8FaIugAg4x9Kf1hpxcYEg6Yce1L+mq4DmsrYP1cV-----END PRIVATE KEY-----",
          "publicKey": "-----BEGIN PUBLIC KEY-----MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAETFS1rh0vkvp7yarpB1kKkrg5rlSuB/TN9X+8W58TPw4o1/BWiLoAIOMfSn9YacXGBIOmHHtS/pquA5rK2D9XFQ==-----END PUBLIC KEY-----"
        }, rsa: {
          iv: "AT8jTu6lyuG+fg==",
          privateKey: "-----BEGIN PRIVATE KEY-----MIIJQwIBADANBgkqhkiG9w0BAQEFAASCCS0wggkpAgEAAoICAQDK1WuYLdthEdgs/LSASfnIze5Q8Q5ndK1Nfr0iT5PG/DlVyeGNMu+LVg1C2XOuKuwrVC+JaXJpOEMF5DLN8hmxulZVbzvoPTb11ZoC3zqdIBymnHIsY4w9AnJpNzZ3W35oieiFQUROfEDe4MdZNcwVBUpCSRyGuEf00s2q66CRZ6v7+YbmHJeKxMeU2/tYUr/lMx+Y8bpxnGfMv9RD8DB600EchwoiHLpbQQZrje1auN2Kn68ZH4tWm9HM1PwwvcizW/MOPB2CnCawwkohizaRqalIUqUKKWpU5Hnig0g2WCdRWEDRI2Vbha8auLPL6M86J+AdzXHDIYxwYbuiqJ0GTq+OPGtZXyqQWch0zBrC2TYimIo5FHRl69Mm4GKWgvZmvm3k2Ba9xMvdKLImxhJ0C7RKasaw/u4pflfwafYw+M1WCfNtDvlfhPi2JSUd/rQ/t2onS6djWITtsgYIZYQIEfltSyrxv5E7KKNGDlreZa3kEOSHvs0sote7NkyrWzqSaz4+1m86CKfJqcqRqkjkv5+s30PvJUCh2epnOJSAcDFRBCu/SaLoX+Knw2yuXSELzQvFvk3A8g8QFiB9Y60c6sJxW3lY9ohxo7EGpw0r7bEpGUdIXeGQWY/P574veP69jbHs3fVGlzuuuv+bw9ixl01qPsVVnp2y68vcPNthkwIDAQABAoICAA+x66qcYx0umM2DsQyQ7NZIHQ3qq+R/J56B/+zvlG3xfBbye/9a4Xn6Ks+Gl7LH7ntnKcCBG3x0gTcrp8S+MZUfkpOiJlQQ/Izm6OJvrI+WTwaTairwzwa03EPeT7AfsSHcs1SFrt1AicfVQ90C0oEOkObyf6sVsmJe4ibnfFwUAL+1g2Xl8NH+P7qkj7KPa1A3IFWg4CjvYywkQdlkn2kO/2Wk4LiwBA7l8rMQNJLFuvAsQrZ3yuaPlcXloIK9r2c1kRKuaH1/9hHNDu3BNx6WrsXXuJ6XLXur1u9F8lNbhztTpWb+zVaDeypfABv3WVBU3+eJIKmVPH1BCsMKN2WEuL7j/JGUBx1yCHVp47R0FoRyNT7J2X4CnpmvXWzZalbwK17jwFnd4P6Ne/6/BOHocXOUlFHNra7n9nALq/mtlc7z2k8u13v+oBepVTMsF1RFzU1Q7nG3CfT6+JZk2EdGbmtrm/KRMJdNlImSv8NpWQU+f7WntRKyKA3MfdWW1X5j0bGKNWpGrJwy0x3FMdeAkBUPtt+rucVZrmtKfQtXGmftJF69Xga1ekJP2kyYvdNPE4rDsUOeEUgSRzTScvhL3i+1TN8qCqBGDhkpIFon+V9VtB9yf4WfAPdBLp+OaTlsfamzbiTkROHITHJcUJrYBdUfLUUkxjSeOkRi7BCJAoIBAQDxoQtVYIjkApy+dTNZXhVMhZs4jWLlb+9tH/mvTVzCSinukeVec73zgiE6+Yb+7n/lXxyPIE4stRf/p95HMebm/XQLBcXW4/n3DGpkixs/m5x2yHF3ROaC1csDPqXyBeeGBypu0qtgz6AyDkRy526Eth+D7/wiVCDQeuGdAQpUej8x4dSjGpihBdv53l0z7gX9thdD+zQeqxOlKAhZB4dHCNHHDYq0ZTQOc2Y201p3/VMCQBRcDCIVoCnuXuaJsv7oDTVqL/U8g1JdKTSoHFjFm/8vfdJU8Edlcu8bx+mwD271g0g5DX5ynp0vFA9gAfEhraNLgUqZlUXtMOvUlFVpAoIBAQDW5bD/SKjKEvgvRkJl7xmbcs4YtweEH5qO7JNPIXK4ehMjl7GK2wcb4aUNmzLYt+Sz6kZmG97pxfDo/ipPl9+KzM0wdnKijrHz24nU3lZP8cHLqY3ewykjI6d4MChEKFg5voZv6KsS4g6OocU1YJDP9YIf2axLM/VwPUSGUxIp6E20rtu0Y4X2r5thZCk0wczkT7GZtKP51Qg45L/4euJi3Ohuaj6xSXIlJaoodHQbznbpDvWHx4pqiQZM8nEd/G92VAc5ROx6GIZZfAFRvxyOl6A87HZdiMHOD+zLobIXV/alFZHEjoOpLlFnqa/w5O//h9d1DPw3yo7HSIfeEfObAoIBAHk1/GV746/dz5uLV5MBK1YTv+YCpxXJrSXk4HAcMugUJCzVa2aSUTuSj/Dxs9K2+dmqeL0jy5OJ1Nwe7dZxJg/CHTBaWQCPpJlV1RlS3vxtp3O+4YyfN7NyZEDgcIaUh6wodBTcAbSy8v2pQpURm9NfOTgKb0UZRszOl9cW6oOuP31aeDzJ3r8IHW2fKsoeIUtAyTMFFQQ9dcFn76gZqrbrqbBdDrOoAREuupvOMpf2sGl0k8IJJCANFHvLh4KUFGN8HMuD+1W72tl5Dj022yFmPAEq8RRC5M3zdhdNleEIHPV0Qgq8xi3he6BeQ8g5sSjf3gbGeRHKXCW8YNFnB+ECggEBAJlwQ6LjdHFkfgTzO7GguT3/CR0ogptaHXdzf/L+RPVnZIcDZudoYHkN8lX2vKV1GD1GR6HcwJtWlB8oa3mNTTXD6bZyvINJM9KUrKNrZWGLkv4iQIQQAS1v5cGxUO7ph6UjXsZE8PF4q0A4TaFBI+T4vUKUn6rKnLLZbDYk1lFJ50HdoE36ycpLtLwjUjCzN+LE7GB9VJ+r9kT5QADhbQd+CA/emIjpkjDn5ckg7U51av4ZikK6vSA4WmFSsmXguo1YjhfcGKVNIZB/NEn0FSXTKbyWciVy4j6JrF/xQkHcsuVIs14PC/8ebU2BIXj1Xk+r5LFU5jnHzY6JQUnUs4UCggEBAIAXRIhiJ6uENXetFRPra7CSVKU3Bx8aiTLRinfmBLN5IxUchFAck9JRIzqq8ZWJPhn+xAUfcJEDDwE0Q+80IhFB+psiwSRp47qnUnEWm3GR8z1WBXImDbMJQ/zvyJoX3b/iHk0dPYs3SHtrVyDF8wnvw0uwi2gQk2p0I+UDoFwgOzBkB9DU9piHVIPyzmHI4/LYvfttTvbYfxTvch9WuHU/iap9sucoWC2RUYO6LDJKZSVnhM5DkrnV5zDX1VagDds25Ji4VxBQe9XeShauKp7QLgcbRgmk5iumKEV4OEEyY7FqWOABH30Ct47zPnjRM3C4SE33OPylpbDC7kVINjg=-----END PRIVATE KEY-----",
          publicKey: "-----BEGIN PUBLIC KEY-----MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAytVrmC3bYRHYLPy0gEn5yM3uUPEOZ3StTX69Ik+Txvw5VcnhjTLvi1YNQtlzrirsK1QviWlyaThDBeQyzfIZsbpWVW876D029dWaAt86nSAcppxyLGOMPQJyaTc2d1t+aInohUFETnxA3uDHWTXMFQVKQkkchrhH9NLNquugkWer+/mG5hyXisTHlNv7WFK/5TMfmPG6cZxnzL/UQ/AwetNBHIcKIhy6W0EGa43tWrjdip+vGR+LVpvRzNT8ML3Is1vzDjwdgpwmsMJKIYs2kampSFKlCilqVOR54oNINlgnUVhA0SNlW4WvGrizy+jPOifgHc1xwyGMcGG7oqidBk6vjjxrWV8qkFnIdMwawtk2IpiKORR0ZevTJuBiloL2Zr5t5NgWvcTL3SiyJsYSdAu0SmrGsP7uKX5X8Gn2MPjNVgnzbQ75X4T4tiUlHf60P7dqJ0unY1iE7bIGCGWECBH5bUsq8b+ROyijRg5a3mWt5BDkh77NLKLXuzZMq1s6kms+PtZvOginyanKkapI5L+frN9D7yVAodnqZziUgHAxUQQrv0mi6F/ip8Nsrl0hC80Lxb5NwPIPEBYgfWOtHOrCcVt5WPaIcaOxBqcNK+2xKRlHSF3hkFmPz+e+L3j+vY2x7N31Rpc7rrr/m8PYsZdNaj7FVZ6dsuvL3DzbYZMCAwEAAQ==-----END PUBLIC KEY-----"
        },
        "diseases": [
          {
            "name": "Covid-19",
            "hospitals": [
              "_1"
            ]
          }
        ],
        "hospitals": [
          {
            "cipher": {
              "disease": "Covid-19",
              "diagnoses": [
                {
                  "doctor": "Chandra",
                  "date": "2022/03/25 23:33:15",
                  "detail": "1st visit",
                  "hash": null
                },
                {
                  "doctor": "Chandra",
                  "date": "2022/03/26 02:02:02",
                  "detail": "2nd visit",
                  "hash": null
                }
              ]
            }
          }
        ]
      },
      {
        "_id": 2,
        "name": "Joseph",
        "rsa": {
          "privateKey": "-----BEGIN PRIVATE KEY-----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-----END PRIVATE KEY-----",
          "publicKey": "-----BEGIN PUBLIC KEY-----MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAnsosvE1pZYO+ajfd/6kiuq5B53G6YPlOMAKyPZtEAcIyHC0i6jiqOoh7KbdOwE+St+UyG3MIcDeZNoF0fGbTUP371e6WUoE8N9OABv9nlt7hbARIYqoLcFEccccg1K/6PI3j20QB0zh4KdIN6Ev4axdtnre4dFwL4cdc3bE/NLt9OOI6vWGhUBDWL5IYMM0wkicJSSEgv5Zu6Ud9LPFQYEJCtCY1dUPrsQ19Y4f2R9XNohAWjvJmGmrHn2J01jzDREtL0Httz7Z0C+vAkX8ClSXAl0OYj3TkMBBrmddB5Nqi42XE2gDWJwURi9VWLNjDQxR+DvzK0Fh3HU+9iZKyvpxVFKhN9Xasbkw2ya1JgvU/+nKvNh/I0Xpi0jCZJsBzFytfJfSmCdILI4z0lsRPe2vK1S7gy+DhCYa7WobAgIPVWl3YMtNro0trutvh4SJhIRdt18f03C48CC6se6TUzOZDaLNTP0LJXz8alRnBPMnNCTxD1c6rSmyaRTM9vGEBx3B7ttj3G8ZPOYBH/pjjITTtw2LvyVe6LNZmnxq69+OlKm+N3uV/vHOQicfVvdnXXgC3eSPMHN6NXc7W3vJCoq/5rwae7qmrntfCFUqS9J5TdeKD8qxDZg7syedyF2H7HKr4AQBOtaYnM3X1NanQSq3VA7eKduET8QRqW3N4UkkCAwEAAQ==-----END PUBLIC KEY-----"
        },
        "ecdh": {
          "privateKey": "-----BEGIN PRIVATE KEY-----MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgSXACCwu1UwGTVAvB7AD5/kr49oo3A9UHeDxM4aAKH3KhRANCAAT13Lt4X6V1uZSRawcymGe1hyfDRVzAFt+Dznqo4vTXWI9SBhhILxIlxvOJank5lXMDXCPhwWPtAUUFngo/bvno-----END PRIVATE KEY-----",
          "publicKey": "-----BEGIN PUBLIC KEY-----MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE9dy7eF+ldbmUkWsHMphntYcnw0VcwBbfg856qOL011iPUgYYSC8SJcbziWp5OZVzA1wj4cFj7QFFBZ4KP2756A==-----END PUBLIC KEY-----"
        }
      }
    ],
    hospital: {
      "_id": 1,
      "name": "National Taiwan University Hospital",
      "ecdh": {
        "privateKey": "-----BEGIN PRIVATE KEY-----MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgQtw3L9q2iU0GyDP9uH1HU1TrN/j1tl2UrsEosEAtRe2hRANCAAQTg25P/kFUsTy7JmH8mznAYzSYyGrAI8D6q4+NvVpapAlK4ErwotC9nn+fTdqs/LQouHkIBpSPI3IvKU/kgOiP-----END PRIVATE KEY-----",
        "publicKey": "-----BEGIN PUBLIC KEY-----MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEE4NuT/5BVLE8uyZh/Js5wGM0mMhqwCPA+quPjb1aWqQJSuBK8KLQvZ5/n03arPy0KLh5CAaUjyNyLylP5IDojw==-----END PUBLIC KEY-----"
      },
      "patients": [
        "1"
      ]
    }
  }

  constructor(
    private Crypto: CryptoService
  ) {
  }

  async ngOnInit(): Promise<void> {
    const hospital = {
      privateKey: await this.Crypto.ECDH.importPrivateKey(this.sampleData.hospital.ecdh.privateKey, "P-256"),
      publicKey: await this.Crypto.ECDH.importPublicKey(this.sampleData.hospital.ecdh.publicKey, "P-256")
    }

    const patient = {
      privateKey: await this.Crypto.ECDH.importPrivateKey(this.sampleData.patients[0].ecdh.privateKey, "P-256"),
      publicKey: await this.Crypto.ECDH.importPublicKey(this.sampleData.patients[0].ecdh.publicKey, "P-256"),
      rsa: {
        privateKey: null,
        publicKey: null
      }
    }

    //----------------------------------------------------------------------------------
    // DISEASE DATA EXPERIMENT
    //----------------------------------------------------------------------------------
    const disease = "Covid-19";

    const rsa = {
      privateKey: await this.Crypto.RSA.importPrivateKey(this.sampleData.patients[0].rsa.privateKey),
      publicKey: await this.Crypto.RSA.importPublicKey(this.sampleData.patients[0].rsa.publicKey)
    }

    const iv = this.sampleData.patients[0].rsa.iv
    const buffer_iv = this.Crypto.RSA.importNonce(this.sampleData.patients[0].rsa.iv)

    await this.Crypto.RSA.encrypt(disease, rsa.publicKey, buffer_iv)

    // Create Disease Hash
    const master_key = await this.Crypto.ECDH.computeSecret(hospital.privateKey, patient.publicKey)
    const temp_disease = this.Crypto.AES.encrypt(disease, master_key, iv) // Create a static cipher to be hashed
    const hash_disease = await this.Crypto.Hash.SHA512(temp_disease, true) // This hash will become the metadata

    // Doctor creates disease session_key & cipher
    const disease_Sk = await this.Crypto.Hash.SHA512(master_key + hash_disease, true)
    const disease_cipher = this.Crypto.AES.encrypt(disease, disease_Sk)

    // Patient decrypt the disease cipher
    const patient_Mk = await this.Crypto.ECDH.computeSecret(patient.privateKey, hospital.publicKey)
    const patient_disease_Sk = await this.Crypto.Hash.SHA512(patient_Mk + hash_disease, true)
    const disease_decipher = this.Crypto.AES.decrypt(<string>disease_cipher, patient_disease_Sk)

    const disease_result = {
      "1_disease": disease,
      "2_digest_metadata": hash_disease,
      "3_master_key": master_key,
      "4_session_key (Level 1)": disease_Sk,
      "5_hospital_encrypt": disease_cipher,
      "6_patient_decrypt": disease_decipher
    }

    console.log("Disease Result:", disease_result)

    //----------------------------------------------------------------------------------
    // DIAGNOSE DATA EXPERIMENT
    //----------------------------------------------------------------------------------

    const diagnose = {
      "doctor": "Chandra",
      "date": "2022/03/25 23:33:15",
      "detail": "1st visit abcdefghijklmnopqstuvwxyz",
      "metadata": ""
    }

    // Doctor create diagnose record session_key
    diagnose.metadata = await this.Crypto.Hash.SHA512(diagnose.doctor + diagnose.date + diagnose.detail, true)
    const diagnose_session_key = await this.Crypto.Hash.SHA512(disease_Sk + diagnose.metadata, true)
    const diagnose_cipher = {
      doctor: this.Crypto.AES.encrypt(diagnose.doctor, diagnose_session_key),
      date: this.Crypto.AES.encrypt(diagnose.date, diagnose_session_key),
      detail: this.Crypto.AES.encrypt(diagnose.detail, diagnose_session_key)
    }

    // Patient decrypt the diagnose:
    const patient_disease_session_key = await this.Crypto.Hash.SHA512(patient_Mk + hash_disease, true)
    const patient_diagnose_Sk = await this.Crypto.Hash.SHA512(patient_disease_session_key + diagnose.metadata, true)
    const diagnose_decipher = {
      doctor: this.Crypto.AES.decrypt(diagnose_cipher.doctor, patient_diagnose_Sk),
      date: this.Crypto.AES.decrypt(diagnose_cipher.date, patient_diagnose_Sk),
      detail: this.Crypto.AES.decrypt(diagnose_cipher.detail, patient_diagnose_Sk)
    }

    const diagnose_result = {
      "1_diagnose": diagnose,
      "2_master_key": disease_Sk,
      "3_hash_component": diagnose.metadata,
      "4_session_key (Level 2)": diagnose_session_key,
      "5_doctor_cipher": diagnose_cipher,
      "6_patient_decipher": diagnose_decipher
    }

    console.log("Diagnose Result:", diagnose_result)
  }
}
