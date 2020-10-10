import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { error } from 'protractor';
import { SwiperOptions } from 'swiper';
import { Estate } from '../models/Estate';
import { EstateService } from '../service/estate.service';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { RegistrationDialogComponent } from './registration-dialog/registration-dialog.component';
import {Image} from "src/app/models/Image"
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  listOfEstates: Array<Estate> = []
  listOfImages: Array<Image> = [];

  constructor(private dialog: MatDialog, private estateService: EstateService) { }


  config: SwiperOptions = {
    slidesPerView: 2,
    spaceBetween: 50,
    slidesPerGroup: 2,
    loop: true,
    loopFillGroupWithBlank: false,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    }
  }


  ngOnInit() {
    this.getAllEstates();
  }

  getAllEstates() {
    this.estateService.getAll().subscribe(resp => {
      this.listOfEstates = resp as Array<Estate>

      console.log(resp);
      
      
      for(const img of this.listOfEstates){
        this.listOfImages.push(img.listOfImages[0])
      }
    })
  }

  openRegistrationDialog() {
    const dialogRef = this.dialog.open(RegistrationDialogComponent, {
      width: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
  openLoginDialog() {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
