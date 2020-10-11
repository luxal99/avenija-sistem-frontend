import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { SwiperOptions } from 'swiper';
import { LoginDialogComponent } from '../home/login-dialog/login-dialog.component';
import { RegistrationDialogComponent } from '../home/registration-dialog/registration-dialog.component';
import { Estate } from '../models/Estate';
import { EstateService } from '../service/estate.service';

@Component({
  selector: 'app-estate-page-overview',
  templateUrl: './estate-page-overview.component.html',
  styleUrls: ['./estate-page-overview.component.css']
})
export class EstatePageOverviewComponent implements OnInit {

  estate = new Estate()

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

  constructor(private route: ActivatedRoute, private dialog: MatDialog, private estateService: EstateService) { }

  ngOnInit() {
    window.scrollTo(0,0)
    this.findEstate();
  }

  ngAfterViewInit(): void {


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

}
