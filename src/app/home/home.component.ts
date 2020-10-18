import { Component, OnInit, ViewChild } from '@angular/core';
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
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import { PartOfCity } from '../models/PartOfCity';
import { PartOfCityService } from '../service/part-of-city.service';
import { AdvertisingRequest } from '../models/AdvertisingRequest';
import { User } from '../models/User';
import { UserInfo } from '../models/UserInfo';
import { Location } from '../models/Location';
import { AdvertisingRequestService } from '../service/advertising-request.service';
import { AfterViewChecked } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,AfterViewChecked  {

  @ViewChild('editor', { static: false }) editorComponent: CKEditorComponent;
  public Editor = ClassicEditor;


  searchForm = new FormGroup({
    id_transaction_type: new FormControl("", Validators.required),
    id_city: new FormControl("", Validators.required),
    id_estate_category: new FormControl("", Validators.required),
    id_estate_sub_category: new FormControl("", Validators.required)
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
  listOfImages: Array<Image> = [];
  listOfEstateCategories: Array<EstateCategory> = [];
  listOfEstateSubCategories: Array<EstateSubCategory> = [];
  listOfCities: Array<City> = []
  listOfTransaction: Array<Transaction> = [];
  listOfPartsOfCities: Array<PartOfCity> = [];

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
    this.getAllEstates();
    this.getAllTransaction();
    this.getEstateCategories();
    this.getEstateSubCategories();
    this.getPartsOfCities()
    this.getCities();
    this.setResponsiveSlider();
    // setTimeout(() => {
    //   this.wm.nativeElement.click();
    //   }, 1000);

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
      id_city: this.searchForm.get("id_city").value,
      id_transaction_type: { id: 1 },
      id_estate_category: this.searchForm.get("id_estate_category").value,
      id_estate_sub_category: this.searchForm.get("id_estate_sub_category").value
    }
    localStorage.setItem("filter", JSON.stringify(filter));
    this.router.navigate(['/filter'])
  }

  searchOnRent() {
    let filter =
    {
      id_city: this.searchForm.get("id_city").value,
      id_transaction_type: { id: 2 },
      id_estate_category: this.searchForm.get("id_estate_category").value,
      id_estate_sub_category: this.searchForm.get("id_estate_sub_category").value
    }
    localStorage.setItem("filter", JSON.stringify(filter));
    this.router.navigate(['/filter'])
  }

  scrollToElement($element): void {
    $element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });

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
