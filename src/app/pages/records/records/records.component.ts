import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from "../../../shared/services/api/api.service";
import {CryptoService} from "../../../shared/services/crypto/crypto.service";

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit {
  diseases: any
  constructor() {
  }

  ngOnInit() {
    this.diseases = JSON.parse(<string>sessionStorage.getItem('diseases'))
    console.log(this.diseases)
  }

}
