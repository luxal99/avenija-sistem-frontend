import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';

import { AdvertisingRequest } from '../models/AdvertisingRequest';
import { AdvertisingRequestService } from '../service/advertising-request.service';
import { AfterViewChecked } from '@angular/core';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import { City } from '../models/CIty';
import { CityService } from '../service/city.service';
import { Estate } from '../models/Estate';
import { EstateCategory } from '../models/EstateCategory';
import { EstateCategoryService } from '../service/estate-category.service';
import { EstateProperty } from '../models/EstateProperty';
import { EstateService } from '../service/estate.service';
import { EstateSubCategory } from '../models/EstateSubCategory';
import { EstateSubCategoryService } from '../service/estate-sub-category.service';
import { Filter } from '../models/Filter';
import { ImageModel } from "src/app/models/ImageModel"
import { Location } from '../models/Location';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { PartOfCity } from '../models/PartOfCity';
import { PartOfCityService } from '../service/part-of-city.service';
import { RegistrationDialogComponent } from './registration-dialog/registration-dialog.component';
import { Router } from '@angular/router';
import { SwiperOptions } from 'swiper';
import { Transaction } from '../models/Transaction';
import { TransactionService } from '../service/transaction.service';
import { User } from '../models/User';
import { UserInfo } from '../models/UserInfo';
import { error } from 'protractor';
import { query } from '@angular/animations';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('editor', { static: false }) editorComponent: CKEditorComponent;
  public Editor = ClassicEditor;


  searchForm = new FormGroup({
    id_transaction_type: new FormControl("", Validators.required),
    id_city: new FormControl("", Validators.required),
    id_estate_category: new FormControl("", Validators.required),
    priceFrom: new FormControl(0),
    priceTo: new FormControl(0)
  })

  userInfoForm = new FormGroup({
    full_name: new FormControl("", Validators.required),
    email: new FormControl("", Validators.required),
    telephone: new FormControl("", Validators.required),
  })

  secondForm = new FormGroup({
    quadrature: new FormControl("", Validators.required),
    priceFrom: new FormControl("", Validators.required),
    priceTo: new FormControl("", Validators.required),
    id_transaction_type: new FormControl("", Validators.required)
  })

  locationForm = new FormGroup({
    address: new FormControl("", Validators.required),
    id_part_of_city: new FormControl("", Validators.required),
    id_estate_sub_category: new FormControl("", Validators.required)
  })

  listOfEstates: Array<Estate> = []
  listOfImages: Array<ImageModel> = [];
  listOfEstateCategories: Array<EstateCategory> = [];
  listOfEstateSubCategories: Array<EstateSubCategory> = [];
  listOfCities: Array<City> = []
  listOfTransaction: Array<Transaction> = [];
  listOfFavoriteEstates: Array<any> = [];
  listOfPartsOfCities: Array<PartOfCity> = [];
  listOfPromotedEstates: Array<any> = [];

  constructor(private dialog: MatDialog, private estateService: EstateService,
    private cityService: CityService, private transactionTypeService: TransactionService,
    private estateCategoryService: EstateCategoryService, private partOfCityService: PartOfCityService,
    public _snackBar: MatSnackBar, private advertisingRequestService: AdvertisingRequestService,
    private estateSubCategoryService: EstateSubCategoryService, private router: Router) { }


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

  list: [{ n: 'a' }, { n: 'a' }, { n: 'a' }]
  ngOnInit() {
    this.getFavoriteEstates();
    this.getPromotedEstates();
    this.getAllTransaction();
    this.getEstateCategories();
    this.getEstateSubCategories();
    this.getPartsOfCities()
    this.getCities();
    this.setResponsiveSlider();
  }

  setResponsiveSlider() {
    if (window.screen.width <= 570) {
      this.config.slidesPerView = 1
      this.config.spaceBetween = 300
      this.config.slidesPerGroup = 1
    }
  }


  async filterPartOfCity() {

    this.listOfEstateSubCategories = JSON.parse(localStorage.getItem("ESC"))
    let id_estate_category: EstateCategory = this.searchForm.get("id_estate_category").value;
    this.listOfEstateSubCategories = this.listOfEstateSubCategories.filter(x => x.id_estate_category.id === id_estate_category.id)

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

  getFavoriteEstates() {
    this.estateService.getFavorites().subscribe(resp => {
      this.listOfFavoriteEstates = resp;
    })
  }

  getPromotedEstates() {
    this.estateService.getPromoted().subscribe(resp => {
      this.listOfPromotedEstates = resp;

    })
  }

  getPartsOfCities() {
    this.partOfCityService.getAll().subscribe(resp => {
      this.listOfPartsOfCities = resp as Array<PartOfCity>
      localStorage.setItem("POC", JSON.stringify(this.listOfPartsOfCities))
    }, err => {
      this.openSnackBar("Dogodila se greska", "AGAIN")
    })
  }

  getEstateSubCategories() {
    this.estateSubCategoryService.getAll().subscribe(resp => {
      this.listOfEstateSubCategories = resp as Array<EstateSubCategory>
      localStorage.setItem("ESC", JSON.stringify(this.listOfEstateSubCategories))
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

  searchOnSell() {
    let filter =
    {
      estateProperty: { id_transaction_type: "Prodaja" }
    }
    localStorage.setItem("filter", JSON.stringify(filter));
    this.router.navigate(['/filter'])
  }

  searchOnRent() {
    let filter =
    {
      estateProperty: { id_transaction_type: "Izdavanje" }
    }
    localStorage.setItem("filter", JSON.stringify(filter));
    this.router.navigate(['/filter'])
  }

  scrollToElement($element): void {
    $element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });

  }
  search() {

    let filter = new Filter()
    filter.priceFrom = Number.parseInt(this.searchForm.get("priceFrom").value);
    filter.priceTo = Number.parseInt(this.searchForm.get("priceTo").value)
    filter.estateProperty = new EstateProperty(this.searchForm.get("id_city").value, this.searchForm.get("id_estate_category").value, this.searchForm.get("id_transaction_type").value)


    if (filter.priceFrom === 0) delete filter.priceFrom
    if (filter.priceTo === 0) delete filter.priceTo

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

  openEstate(id: number) {
    this.router.navigate(['/estate'], { queryParams: { id: id } })
  }
  sendAdvertisingRequset() {
    let advertisingRequest = new AdvertisingRequest();

    // Step 1
    advertisingRequest.id_user_info = new UserInfo(
      this.userInfoForm.get("full_name").value,
      this.userInfoForm.get("email").value,
      this.userInfoForm.get("telephone").value
    )

    // Step 2

    advertisingRequest.priceFrom = this.secondForm.get("priceFrom").value;
    advertisingRequest.priceTo = this.secondForm.get("priceTo").value;
    advertisingRequest.quadrature = this.secondForm.get("quadrature").value;
    advertisingRequest.id_transaction_type = this.secondForm.get("id_transaction_type").value;

    // Step 3

    advertisingRequest.id_location = new Location(
      this.locationForm.get("address").value,
      this.locationForm.get("id_part_of_city").value
    );

    advertisingRequest.id_estate_sub_category = this.locationForm.get("id_estate_sub_category").value;
    advertisingRequest.description = this.editorComponent.editorInstance.getData();

    this.advertisingRequestService.save(advertisingRequest).subscribe(resp => {
      this.openSnackBar("Uspesno ste postali zahtev", "DONE")

    }, err => {
      this.openSnackBar("Neuspesan zahtev", "DONE")

    })

  }
}
