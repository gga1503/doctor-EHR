import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-list-ehr',
  templateUrl: './table-list-ehr.component.html',
  styleUrls: ['./table-list-ehr.component.scss']
})
export class TableListEhrComponent implements OnInit {

  placeHolders: string = "Search Disease";

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(searchBar: NgForm) {
    this.router.navigate(['searchBar', searchBar.value.search]);
    console.log("search submitted")
  }
}
