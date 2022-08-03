import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-record-search',
  templateUrl: './record-search.component.html',
  styleUrls: ['./record-search.component.scss']
})
export class RecordSearchComponent implements OnInit {

  placeHolders: string = "Search Disease";

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(searchBar: NgForm) {
    this.router.navigate(['searchBar', searchBar.value.search]);
    console.log("search submitted")
  }
}
