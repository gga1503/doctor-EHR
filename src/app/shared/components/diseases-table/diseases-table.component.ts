import {Component, Input, OnChanges, OnInit,} from '@angular/core';
import {ApiService} from "../../services/api/api.service";

@Component({
  selector: 'app-diseases-table',
  templateUrl: './diseases-table.component.html',
  styleUrls: ['./diseases-table.component.scss']
})
export class DiseasesTableComponent implements OnInit {
  @Input() records = [{
    "_id": "",
    "data": {
      "patient_bc_address": "",
      "hospital_bc_address": "",
      "name": "",
      "model": "",
      "_id": ""
    },
    "id": ""
  }];

  constructor(private api: ApiService) {
  }

  ngOnInit(): void {
  }

}
