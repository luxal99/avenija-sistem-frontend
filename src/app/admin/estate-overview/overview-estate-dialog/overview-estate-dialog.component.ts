import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Estate } from 'src/app/models/Estate';

import Swiper, { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-overview-estate-dialog',
  templateUrl: './overview-estate-dialog.component.html',
  styleUrls: ['./overview-estate-dialog.component.css']
})
export class OverviewEstateDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Estate) { }

  ngOnInit() {
  }

config: SwiperOptions = {
    slidesPerView: 2,
    spaceBetween: 100,
    slidesPerGroup: 1,
    loop: true,
    loopFillGroupWithBlank: false,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    }
  }

}
