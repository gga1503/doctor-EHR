import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'table-ciphers',
  templateUrl: './ciphers.table.component.html',
  styleUrls: ['./ciphers.table.component.scss']
})

export class CiphersTableComponent implements OnInit{
  @Input() ciphers: any;
  @Output() toggle = new EventEmitter();

  constructor(){
  }

  ngOnInit(): void {
  }

  triggerScanner(){
    this.toggle.emit()
  }
}
