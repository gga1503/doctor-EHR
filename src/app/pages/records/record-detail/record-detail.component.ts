import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {ApiService} from '../../../shared/services/api/api.service';
import {CryptoService} from '../../../shared/services/crypto/crypto.service';

@Component({
  selector: 'app-record-detail',
  templateUrl: './record-detail.component.html',
  styleUrls: ['./record-detail.component.scss']
})
export class RecordDetailComponent implements OnInit {
  record = JSON.parse(<string>sessionStorage.getItem('record'))
  disease = JSON.parse(<string>sessionStorage.getItem('disease'))
  blockchain: any = {}

  constructor(
    private location: Location,
    private api: ApiService,
    private Crypto: CryptoService
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.getBlockchainTx()
  }

  getBlockchainTx() {
    const observable = {
      next: async (response: any) => {
        this.blockchain = {
          disease: response.bc._disease,
          diagnose: response.bc._diagnose
        }

        await this.verify()
      }, error: (err: Error) => console.error(err),
      complete: () => subscription.unsubscribe()
    }

    const subscription = this.api.get(`records/tx/${this.record.bc_tx_address}`).subscribe(observable)
  }

  async verify() {
    this.record.metadata = await this.Crypto.Hash.SHA512(this.record.diagnose, true)
    this.record.verified = this.blockchain.diagnose == this.record.metadata
  }

  previousPage() {
    this.location.back();
  }
}
