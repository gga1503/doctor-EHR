import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from "../../services/api/api.service";

@Component({
  selector: 'app-patient-card',
  templateUrl: './patient-card.component.html',
  styleUrls: ['./patient-card.component.scss']
})
export class PatientCardComponent implements OnInit {
  @Input() patient = {
    "_id": "",
    "data": {
      "name": "",
      "bc_address": "",
      "dob": "",
      "gender": "",
      "ecdh_public_key": "",
      "ed25519_public_key": "",
      "model": "",
      "_id": ""
    },
    "id": ""
  }

  constructor(private api: ApiService) { }

  ngOnInit(): void {
  }

}
