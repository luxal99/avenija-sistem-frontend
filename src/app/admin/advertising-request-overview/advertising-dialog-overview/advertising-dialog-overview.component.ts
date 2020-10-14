import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { AdvertisingRequest } from 'src/app/models/AdvertisingRequest';
import { AdvertisingRequestService } from 'src/app/service/advertising-request.service';

@Component({
  selector: 'app-advertising-dialog-overview',
  templateUrl: './advertising-dialog-overview.component.html',
  styleUrls: ['./advertising-dialog-overview.component.css']
})
export class AdvertisingDialogOverviewComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: AdvertisingRequest,private advertisingRequestService:AdvertisingRequestService) { }

  ngOnInit() {
    console.log(this.data);
    
  }

  update(entity:AdvertisingRequest){
    this.advertisingRequestService.update(entity).subscribe(resp=>{
      
    })
  }
}
