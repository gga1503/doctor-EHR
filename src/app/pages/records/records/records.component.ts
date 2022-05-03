import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from "../../../shared/services/api/api.service";

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit {
  @Input() patient_bc_address: String | undefined = '0xafeEb9069Aafc36473234829d00061502bB21ED9';
  @Input() hospital = {};

  patient: any;
  records: any = []

  sample_records = [
    {
      "_id": "626ad668cb213fb4a79a4795",
      "data": {
        "patient_bc_address": "0xafeEb9069Aafc36473234829d00061502bB21ED9",
        "hospital_bc_address": "0x8BCba326411a21BCC3B4D7Fe062b9F59Eda15413",
        "name": "laksjdghfqoierghflaksjhfgalskghjfa",
        "model": "Disease",
        "_id": "626ad668e818f9c83898f546"
      },
      "id": "dd16cb619c2c097682cf2068bb4a7f19bb9042e0edc98cb1e0b0dab0d0969934"
    },
    {
      "_id": "626adcf1cb213fb4a79a47a8",
      "data": {
        "patient_bc_address": "0xafeEb9069Aafc36473234829d00061502bB21ED9",
        "hospital_bc_address": "0x8BCba326411a21BCC3B4D7Fe062b9F59Eda15413",
        "name": "halksjfdhoiquerhfklajhgfliutglkjh",
        "model": "Disease",
        "_id": "626adcf02c132cdaeb923941"
      },
      "id": "2132a44434e2047bb0d88d3e9b80f096f0449588b71c26f7cb54503dfcc50598"
    }
  ]

  constructor(private api: ApiService) {
  }

  ngOnInit(): void {

    // If patient bc address not empty
    if(this.patient_bc_address) {
      this.get_records(this.patient_bc_address)
      this.get_patient(this.patient_bc_address)
    }
  }

  get_patient(address: String): void {
    this.api.get('patients/' + address).subscribe(
      response => {
        this.patient = response
      }
    )
  }

  get_records(address: String): void {
    this.api.get(`patients/${address}/diseases`).subscribe(
      response => {
        this.records = response
      }
    )
  }

  decrypt(hospital:String) {
  }

  get_session_key(hospital: String){
  }
}
