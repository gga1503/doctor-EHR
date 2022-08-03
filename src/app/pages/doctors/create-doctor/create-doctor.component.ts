import { Component, OnInit } from '@angular/core';
import {Location} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-doctor',
  templateUrl: './create-doctor.component.html',
  styleUrls: ['./create-doctor.component.scss']
})
export class CreateDoctorComponent implements OnInit {
  hide = true;
  constructor(private location: Location, private router: Router) { }

  ngOnInit(): void {
  }

  previousPage() {
    this.location.back();
  }

}
