import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-pop-up-scan-qr',
  templateUrl: './pop-up-scan-qr.component.html',
  styleUrls: ['./pop-up-scan-qr.component.scss']
})
export class PopUpScanQrComponent implements OnInit {

  constructor(private popUpRef: MatDialogRef<PopUpScanQrComponent>, private router: Router) {
  }

  ngOnInit(): void {
  }

  onCloseClick(): void {
    this.popUpRef.close();
  }

  onMovePageClick(): void {
    this.popUpRef.close('closed');

    this.popUpRef.afterClosed().subscribe(async (result) => {
      if (result === 'closed') {
        await this.router.navigate(['scan-qr']);
      }
    });
  }
}
