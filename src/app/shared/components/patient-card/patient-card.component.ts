import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api/api.service";

@Component({
  selector: 'app-patient-card',
  templateUrl: './patient-card.component.html',
  styleUrls: ['./patient-card.component.scss']
})
export class PatientCardComponent implements OnInit {

  patient: any

  constructor(private api: ApiService) {
  }

  ngOnInit(): void {
    this.patient = JSON.parse(<string>sessionStorage.getItem('patient'))
  }
}
