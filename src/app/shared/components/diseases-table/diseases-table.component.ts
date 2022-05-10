import {Component, Input, OnChanges, OnInit,} from '@angular/core';
import {ApiService} from "../../services/api/api.service";
import { MatDialog } from '@angular/material/dialog';
import {PopUpScanQrComponent} from "../pop-up-scan-qr/pop-up-scan-qr.component";

@Component({
  selector: 'app-diseases-table',
  templateUrl: './diseases-table.component.html',
  styleUrls: ['./diseases-table.component.scss']
})
export class DiseasesTableComponent implements OnInit {
  @Input() diseases: any;

  dummies = [
    {
      "_id": {
        "hospital": "0x88b05b8A1BEf674b0bE36C23A6Ee6C9bA131BEe8"
      },
      "diseases": [
        {
          "name": "Y2okzAqBs6xp7ggY1tGgXg==",
          "_id": "62768f105bd7cfd31ae4b37e",
          "encrypted": true
        }
      ]
    },
    {
      "_id": {
        "hospital": "0x8BCba326411a21BCC3B4D7Fe062b9F59Eda15413"
      },
      "diseases": [
        {
          "name": "Y2okzAqBs6xp7ggY1tGgXg==",
          "_id": "62767f00fcea5a00055f069b",
          "encrypted": true
        },
        {
          "name": "8rjBZQ5xmzKxWDIIsi8wbA==",
          "_id": "6276800efcea5a00055f069f",
          "encrypted": true
        }
      ]
    }
  ]

  constructor(private popUp: MatDialog) {
  }

  ngOnInit(): void {
  }

  onOpenDialogClick(){
    this.popUp.open(PopUpScanQrComponent);
  }

}
