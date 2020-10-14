import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { MatDialog } from '@angular/material';
import { AdvertisingRequest } from 'src/app/models/AdvertisingRequest';
import { AdvertisingRequestService } from 'src/app/service/advertising-request.service';
import { AdvertisingDialogOverviewComponent } from './advertising-dialog-overview/advertising-dialog-overview.component';

@Component({
  selector: 'app-advertising-request-overview',
  templateUrl: './advertising-request-overview.component.html',
  styleUrls: ['./advertising-request-overview.component.css']
})
export class AdvertisingRequestOverviewComponent implements OnInit {

  listOfAdvertisingRequest: Array<AdvertisingRequest> = [];
  listOfArrivedAdvertisingRequels: Array<AdvertisingRequest> = [];
  listOfOldAdvertisingRequels: Array<AdvertisingRequest> = [];

  constructor(private advertisingRequestService: AdvertisingRequestService,private dialog:MatDialog) { }

  async ngOnInit(): Promise<void> {
    this.getAR()
  }


  getAR() {
    this.advertisingRequestService.getAll().subscribe(resp => {
      this.listOfAdvertisingRequest = resp as Array<AdvertisingRequest>;

      this.listOfArrivedAdvertisingRequels = this.listOfAdvertisingRequest.filter(
        x => x.isReviewed === false
      )

      this.listOfOldAdvertisingRequels = this.listOfAdvertisingRequest.filter(
        x => x.isReviewed === true
      )

    }, err => {

    })
  }

  openAdvertisingRequestDialogOverview(ad) {
    const dialogRef = this.dialog.open(AdvertisingDialogOverviewComponent, {
      minWidth: '60%',
      position: { right: '0' },
      height: '100vh',
      data: ad

    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAR();
    });
  }


  arColumns: string[] = ['id', 'full_name', 'transaction', 'estate_category','option'];
}
