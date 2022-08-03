import { Component, OnInit } from '@angular/core';
import {Location} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-doctor-account',
  templateUrl: './create-doctor-account.component.html',
  styleUrls: ['./create-doctor-account.component.scss']
})
export class CreateDoctorAccountComponent implements OnInit {
  hide = true;
  constructor(private location: Location, private router: Router) { }

  ngOnInit(): void {
  }

  previousPage() {
    this.location.back();
  }

}
