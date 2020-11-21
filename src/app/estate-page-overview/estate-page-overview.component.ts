import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewChecked, Component, OnInit } from '@angular/core';

import { Estate } from '../models/Estate';
import { EstateService } from '../service/estate.service';
import { LoginDialogComponent } from '../home/login-dialog/login-dialog.component';
import { MatDialog } from '@angular/material';
import { RegistrationDialogComponent } from '../home/registration-dialog/registration-dialog.component';
import { SwiperOptions } from 'swiper';

declare var $: any;

@Component({
  selector: 'app-estate-page-overview',
  templateUrl: './estate-page-overview.component.html',
  styleUrls: ['./estate-page-overview.component.css']
})
export class EstatePageOverviewComponent implements OnInit,AfterViewChecked {

  estate = new Estate();

  config: SwiperOptions = {
    slidesPerView: 2,
    spaceBetween: 200,
    slidesPerGroup: 1,
    loop: true,
    loopFillGroupWithBlank: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  }

  constructor(private route: ActivatedRoute, private router :Router,private dialog: MatDialog, private estateService: EstateService) { }

  ngOnInit() {
    window.scrollTo(0,0)
    this.findEstate();
    this.setResponsiveSlider();

  }

  ngAfterViewChecked(): void {
    this.watermark()
  }
  watermark(){
    setTimeout(() => {
      $('.watermark').watermark({
        path: 'assets/img/small_watermark.png',
        gravity: 'c'
      });
    }, 300);
  }

  
  findEstate() {
    this.route.params.subscribe(params => {
      this.estateService.findById(Number.parseInt(params.id)).subscribe(resp => {
        this.estate = resp as Estate;
        localStorage.setItem("estate",JSON.stringify(this.estate))
      })
    })

    this.estate = JSON.parse(localStorage.getItem("estate"))
  }

  searchOnSell(){
    let filter =
    {
      id_city: "",
      id_transaction_type: {id:1},
      id_estate_category: "",
      id_estate_sub_category: ""
    }
    localStorage.setItem("filter", JSON.stringify(filter));
    this.router.navigate(['/filter'])
    
  }

  setResponsiveSlider(){
    if (window.screen.width <= 570) {
      this.config.slidesPerView = 1
      this.config.spaceBetween = 50
      this.config.slidesPerGroup = 1
    }
  }
  searchOnRent (){
    let filter =
    {
      id_city: "",
      id_transaction_type: {id:2},
      id_estate_category: "",
      id_estate_sub_category: ""
    }
    localStorage.setItem("filter", JSON.stringify(filter));
    this.router.navigate(['/filter'])
    
  }

  scrollToElement($element): void {
    $element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });

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
