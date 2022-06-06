import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-unlock-diseases-table',
  templateUrl: './unlock-diseases-table.component.html',
  styleUrls: ['./unlock-diseases-table.component.scss']
})
export class UnlockDiseasesTableComponent {
  @Input() diseases: any

  constructor( private router: Router) {
  }

  async openRecords(diseases: any) {
    sessionStorage.setItem('diseases', JSON.stringify(diseases))
    await this.router.navigate(['records'])
  }
}
