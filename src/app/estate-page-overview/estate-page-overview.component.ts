import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private route: ActivatedRoute, private router :Router,private dialog: MatDialog, private estateService: EstateService) { }

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
