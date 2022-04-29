import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit {

  sampleData = {
    patients: [
      {
        "_id": 1,
        "name": "Ian",
        "age": "24",
        "gender": "male",
        "blockchain_id": "45678",
        "ecdh": {
          "privateKey": "-----BEGIN PRIVATE KEY-----MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgabBxw89huKLNfTLGpMFX1dU58m0F2Y5l5fcIwkbanCahRANCAARMVLWuHS+S+nvJqukHWQqSuDmuVK4H9M31f7xbnxM/DijX8FaIugAg4x9Kf1hpxcYEg6Yce1L+mq4DmsrYP1cV-----END PRIVATE KEY-----",
          "publicKey": "-----BEGIN PUBLIC KEY-----MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAETFS1rh0vkvp7yarpB1kKkrg5rlSuB/TN9X+8W58TPw4o1/BWiLoAIOMfSn9YacXGBIOmHHtS/pquA5rK2D9XFQ==-----END PUBLIC KEY-----"
        }, rsa: {
          iv: "AT8jTu6lyuG+fg==",
          privateKey: "-----BEGIN PRIVATE KEY-----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-----END PRIVATE KEY-----",
          publicKey: "-----BEGIN PUBLIC KEY-----MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAytVrmC3bYRHYLPy0gEn5yM3uUPEOZ3StTX69Ik+Txvw5VcnhjTLvi1YNQtlzrirsK1QviWlyaThDBeQyzfIZsbpWVW876D029dWaAt86nSAcppxyLGOMPQJyaTc2d1t+aInohUFETnxA3uDHWTXMFQVKQkkchrhH9NLNquugkWer+/mG5hyXisTHlNv7WFK/5TMfmPG6cZxnzL/UQ/AwetNBHIcKIhy6W0EGa43tWrjdip+vGR+LVpvRzNT8ML3Is1vzDjwdgpwmsMJKIYs2kampSFKlCilqVOR54oNINlgnUVhA0SNlW4WvGrizy+jPOifgHc1xwyGMcGG7oqidBk6vjjxrWV8qkFnIdMwawtk2IpiKORR0ZevTJuBiloL2Zr5t5NgWvcTL3SiyJsYSdAu0SmrGsP7uKX5X8Gn2MPjNVgnzbQ75X4T4tiUlHf60P7dqJ0unY1iE7bIGCGWECBH5bUsq8b+ROyijRg5a3mWt5BDkh77NLKLXuzZMq1s6kms+PtZvOginyanKkapI5L+frN9D7yVAodnqZziUgHAxUQQrv0mi6F/ip8Nsrl0hC80Lxb5NwPIPEBYgfWOtHOrCcVt5WPaIcaOxBqcNK+2xKRlHSF3hkFmPz+e+L3j+vY2x7N31Rpc7rrr/m8PYsZdNaj7FVZ6dsuvL3DzbYZMCAwEAAQ==-----END PUBLIC KEY-----"
        },
        "diseases": [
          {
            "name": "Covid-19",
            "hospitals": [
              "_1"
            ]
          }
        ]
      }
    ]
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
