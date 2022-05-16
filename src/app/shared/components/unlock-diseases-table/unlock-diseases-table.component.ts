import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-unlock-diseases-table',
  templateUrl: './unlock-diseases-table.component.html',
  styleUrls: ['./unlock-diseases-table.component.scss']
})
export class UnlockDiseasesTableComponent {
  @Input() diseases: any

  constructor() {
  }
}
