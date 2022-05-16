import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.scss']
})
export class QrScanner implements OnInit {
  @Output() qrResult = new EventEmitter<string>();
  @Output() toggle = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  close(): void {
    this.toggle.emit()
  }

  parseResult(resultString: string) {
    this.qrResult.emit(resultString)
  }

  title = 'patient-EHR';

}
