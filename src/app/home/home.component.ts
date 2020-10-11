import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { error } from 'protractor';
import { SwiperOptions } from 'swiper';
import { Estate } from '../models/Estate';
import { EstateService } from '../service/estate.service';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { RegistrationDialogComponent } from './registration-dialog/registration-dialog.component';
import { Image } from "src/app/models/Image"
import { CityService } from '../service/city.service';
import { TransactionService } from '../service/transaction.service';
import { EstateCategoryService } from '../service/estate-category.service';
import { EstateSubCategoryService } from '../service/estate-sub-category.service';
import { City } from '../models/CIty';
import { EstateCategory } from '../models/EstateCategory';
import { EstateSubCategory } from '../models/EstateSubCategory';
import { Transaction } from '../models/Transaction';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchForm = new FormGroup({
    id_transaction_type: new FormControl("", Validators.required),
    id_city: new FormControl("", Validators.required),
    id_estate_category: new FormControl("", Validators.required),
    id_estate_sub_category: new FormControl("", Validators.required)
  })

  listOfEstates: Array<Estate> = []
  listOfImages: Array<Image> = [];
  listOfEstateCategories: Array<EstateCategory> = [];
  listOfEstateSubCategories: Array<EstateSubCategory> = [];
  listOfCities: Array<City> = []
  listOfTransaction: Array<Transaction> = [];

  constructor(private dialog: MatDialog, private estateService: EstateService,
    private cityService: CityService, private transactionTypeService: TransactionService,
    private estateCategoryService: EstateCategoryService, public _snackBar: MatSnackBar,
    private estateSubCategoryService: EstateSubCategoryService,private router:Router) { }


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
    this.getAllTransaction();
    this.getEstateCategories();
    this.getEstateSubCategories();
    this.getCities();
  }


  getCities() {
    this.cityService.getAll().subscribe(resp => {
      this.listOfCities = resp as Array<City>
    }, err => {
      this.openSnackBar("Dogodila se greska", "AGAIN")
    })
  }

  getEstateCategories() {
    this.estateCategoryService.getAll().subscribe(resp => {
      this.listOfEstateCategories = resp as Array<EstateCategory>
    }, err => {
      this.openSnackBar("Dogodila se greska", "AGAIN")
    })
  }


  getEstateSubCategories() {
    this.estateSubCategoryService.getAll().subscribe(resp => {
      this.listOfEstateSubCategories = resp as Array<EstateSubCategory>
    }, err => {
      this.openSnackBar("Dogodila se greska", "AGAIN")
    })
  }

  getAllTransaction() {
    this.transactionTypeService.getAll().subscribe(resp => {
      this.listOfTransaction = resp as Array<Transaction>
    }, err => {
      this.openSnackBar("Dogodila se greska", "AGAIN")
    })
  }

  getAllEstates() {
    this.estateService.getAll().subscribe(resp => {
      this.listOfEstates = resp as Array<Estate>
    })
  }

  search() {
    let filter =
    {
      id_city: this.searchForm.get("id_city").value,
      id_transaction_type: this.searchForm.get("id_transaction_type").value,
      id_estate_category: this.searchForm.get("id_estate_category").value,
      id_estate_sub_category: this.searchForm.get("id_estate_sub_category").value
    }

    localStorage.setItem("filter", JSON.stringify(filter));
    this.router.navigate(['/filter'])
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

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
