import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../shared/services/api/api.service";
import {CryptoService} from '../../../shared/services/crypto/crypto.service';
import {Location} from "@angular/common";

@Component({
  selector: 'app-records-show',
  templateUrl: './records-show.component.html',
  styleUrls: ['./records-show.component.scss']
})
export class RecordsShowComponent implements OnInit {
  record = JSON.parse(<string>sessionStorage.getItem('record'))
  disease = JSON.parse(<string>sessionStorage.getItem('disease'))

  constructor(
    private location: Location
  ) {
  }

  previousPage() {
    this.location.back();
  }

  async ngOnInit(): Promise<void> {
  }
}
