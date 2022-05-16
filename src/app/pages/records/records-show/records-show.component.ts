import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../shared/services/api/api.service";

@Component({
  selector: 'app-records-show',
  templateUrl: './records-show.component.html',
  styleUrls: ['./records-show.component.scss']
})
export class RecordsShowComponent implements OnInit {
  record: String = "";

  constructor(private api: ApiService) { }

  ngOnInit(): void {

  }

}
