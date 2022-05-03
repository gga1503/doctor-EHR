import {Component, OnInit} from '@angular/core';
import {CryptoService} from '../../../shared/services/crypto/crypto.service';
import {ApiService} from "../../../shared/services/api/api.service";

@Component({
  selector: 'app-records-create',
  templateUrl: './records-create.component.html',
  styleUrls: ['./records-create.component.scss']
})
export class RecordsCreateComponent implements OnInit {

  record = {
    "cipher": {
      "doctor": "0xc8f8Bb2E550D8163a3964Fb0A65c92a04646B577",
      "patient": "0xafeEb9069Aafc36473234829d00061502bB21ED9",
      "hospital": "0x8BCba326411a21BCC3B4D7Fe062b9F59Eda15413",
      "disease": "Dengue",
      "diagnose": "Fever & Flu"
    },
    "metadata": {
      "doctor": "0xc8f8Bb2E550D8163a3964Fb0A65c92a04646B577",
      "patient": "0xafeEb9069Aafc36473234829d00061502bB21ED9",
      "hospital": "0x8BCba326411a21BCC3B4D7Fe062b9F59Eda15413",
      "disease": "5e4987ac329df62a3cf515eec7ded6704aea19fa2c80cbc833b55a08ed85495b",
      "diagnose": "18ba4ea725fcf387fa035e33df22db81cbd30dc798ec750222962de643bf5f28"
    }
  }

  constructor(
    private api: ApiService,
    private Crypto: CryptoService
  ) {
  }

  async ngOnInit(): Promise<void> {
    const destination = 'records'
    // const response = await this.api.post(destination, this.record)

    // console.log(response)
  }
}
