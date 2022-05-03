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
