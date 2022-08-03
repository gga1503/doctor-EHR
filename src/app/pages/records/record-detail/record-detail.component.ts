import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";

@Component({
  selector: 'app-record-detail',
  templateUrl: './record-detail.component.html',
  styleUrls: ['./record-detail.component.scss']
})
export class RecordDetailComponent implements OnInit {
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
