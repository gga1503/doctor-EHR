import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'table-diseases',
  templateUrl: './diseases.table.component.html',
  styleUrls: ['./diseases.table.component.scss']
})
export class DiseasesTableComponent {
  @Input() diseases: any

  constructor( private router: Router) {
  }

  async openRecords(diseases: any) {
    sessionStorage.setItem('diseases', JSON.stringify(diseases))
    await this.router.navigate(['records'])
  }
}
