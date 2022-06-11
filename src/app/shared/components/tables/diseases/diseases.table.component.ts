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

  async records(i: number) {
    sessionStorage.setItem('disease', JSON.stringify(this.diseases[i].name))
    sessionStorage.setItem('disease-ciphers', JSON.stringify(this.diseases[i].ciphers))
    await this.router.navigate(['records'])
  }
}
