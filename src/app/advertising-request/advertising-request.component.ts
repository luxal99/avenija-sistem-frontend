import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AdvertisingRequest } from '../models/AdvertisingRequest';
import { City } from '../models/CIty';
import { EstateCategory } from '../models/EstateCategory';
import { EstateSubCategory } from '../models/EstateSubCategory';
import { PartOfCity } from '../models/PartOfCity';
import { Transaction } from '../models/Transaction';
import { UserInfo } from '../models/UserInfo';
import { AdvertisingRequestService } from '../service/advertising-request.service';
import { CityService } from '../service/city.service';
import { EstateCategoryService } from '../service/estate-category.service';
import { EstateSubCategoryService } from '../service/estate-sub-category.service';
import { PartOfCityService } from '../service/part-of-city.service';
import { TransactionService } from '../service/transaction.service';

import { Location } from '../models/Location';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginDialogComponent } from '../home/login-dialog/login-dialog.component';
import { RegistrationDialogComponent } from '../home/registration-dialog/registration-dialog.component';
@Component({
  selector: 'app-advertising-request',
  templateUrl: './advertising-request.component.html',
  styleUrls: ['./advertising-request.component.css']
})
export class AdvertisingRequestComponent implements OnInit {

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

  listOfEstateCategories: Array<EstateCategory> = [];
  listOfEstateSubCategories: Array<EstateSubCategory> = [];
  listOfCities: Array<City> = []
  listOfTransaction: Array<Transaction> = [];
  listOfPartsOfCities: Array<PartOfCity> = [];

  constructor(private dialog: MatDialog,private router:Router,
    private cityService: CityService, private transactionTypeService: TransactionService,
    private estateCategoryService: EstateCategoryService, private partOfCityService: PartOfCityService,
    public _snackBar: MatSnackBar, private advertisingRequestService: AdvertisingRequestService,
    private estateSubCategoryService: EstateSubCategoryService) { }

  ngOnInit() {
    this.getAllTransaction();
    this.getEstateCategories();
    this.getEstateSubCategories();
    this.getPartsOfCities()
    this.getCities()
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
      this.openSnackBar("Uspesno ste postali zahtev","DONE")

    },err=>{
      this.openSnackBar("Neuspesan zahtev","DONE")

    })

  }

  scrollToElement($element): void {
    $element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });

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

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
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
