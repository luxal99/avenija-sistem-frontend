import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';

import { City } from '../models/CIty';
import { CityService } from '../service/city.service';
import { Estate } from '../models/Estate';
import { EstateService } from '../service/estate.service';
import { Filter } from '../models/Filter';
import { LoginDialogComponent } from '../home/login-dialog/login-dialog.component';
import { PartOfCity } from '../models/PartOfCity';
import { PartOfCityService } from '../service/part-of-city.service';
import { RegistrationDialogComponent } from '../home/registration-dialog/registration-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter-page',
  templateUrl: './filter-page.component.html',
  styleUrls: ['./filter-page.component.css']
})
export class FilterPageComponent implements OnInit {


  searchForm = new FormGroup({
    priceFrom: new FormControl("", Validators.required),
    priceTo: new FormControl("", Validators.required),
    id_city: new FormControl("", Validators.required),
    id_part_of_city: new FormControl("", Validators.required)
  })

  selectedCity;

  listOfEstates: Array<Estate> = [];
  filteredEstate: Array<Estate> = [];

  listOfCities: Array<City> = []
  listOfPartsOfCities: Array<PartOfCity> = [];

  filteredPartOfCity: Array<PartOfCity> = []

  constructor(private estateService: EstateService,
    public _snackBar: MatSnackBar,
    private router: Router,
    private partOfCityService: PartOfCityService,
    private cityService: CityService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getAllEstates();
    this.getCities();
    this.getPartsOfCities();
    this.setValue();
    this.filterPartOfCity();
  }


  reset() {
    this.searchForm.get('priceFrom').setValue("");
    this.searchForm.get('priceTo').setValue("");
    this.searchForm.get('id_city').setValue("");
    this.searchForm.get('id_part_of_city').setValue("");

    this.getAllEstates();
  }


  filter() {

    let estetes = JSON.parse(localStorage.getItem("estates"));

    let filter = {
      priceFrom: this.searchForm.get("priceFrom").value,
      priceTo: this.searchForm.get("priceTo").value,
      id_part_of_city: this.searchForm.get("id_part_of_city").value
    }

    console.log(filter.id_part_of_city.id);


    if (filter.priceFrom === 0 && filter.priceTo !== 0) {
      this.filteredEstate = estetes.filter(
        x => x.price <= filter.priceTo ||
          x.id_location.id_part_of_city.id === filter.id_part_of_city.id
      )
    } else if (filter.id_part_of_city.id === undefined && filter.priceTo !== 0 && filter.priceFrom !== 0) {
      this.filteredEstate = estetes.filter(
        x => x.price >= filter.priceFrom && x.price <= filter.priceTo
      )
    } else if (filter.id_part_of_city.id !== undefined) {
      console.log(this.filteredEstate);

      this.filteredEstate = estetes.filter(
        x => x.price >= filter.priceFrom && x.price <= filter.priceTo
          && filter.id_part_of_city.id === x.id_location.id_part_of_city.id
      )
    }


  }

  filterPartOfCity() {

    this.listOfPartsOfCities = JSON.parse(localStorage.getItem("POC"))
    const id: number = this.searchForm.get("id_city").value;

    this.filteredPartOfCity = this.listOfPartsOfCities.filter(x => x.id_city.id === id)

  }


  getCities() {
    this.cityService.getAll().subscribe(resp => {
      this.listOfCities = resp as Array<City>
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

  setValue() {
    var filter: Filter = JSON.parse(localStorage.getItem("filter"));
    this.selectedCity = filter.id_city.id
  }

  getAllEstates() {

    var filter: Filter = JSON.parse(localStorage.getItem("filter"))

    this.searchForm.get("priceFrom").setValue(filter.priceFrom)

    this.searchForm.get("priceTo").setValue(filter.priceTo)



    this.estateService.getAll().subscribe(resp => {
      localStorage.setItem("estates", JSON.stringify(resp))
      this.listOfEstates = resp as Array<Estate>

      this.filteredEstate = this.listOfEstates.filter(x =>
        x.id_location.id_part_of_city.id_city.id === filter.id_city.id
        && x.id_transaction_type.id === filter.id_transaction_type.id
        && x.id_estate_sub_category.id_estate_category.id === filter.id_estate_category.id);


      if (filter.priceFrom < filter.priceTo) {
        this.filteredEstate = this.filteredEstate.filter(x => x.price >= filter.priceFrom && x.price <= filter.priceTo)
      } else if (filter.priceFrom > filter.priceTo) {

        this.filteredEstate = this.filteredEstate.filter(x => x.price >= filter.priceFrom)
      } else if (filter.priceFrom === 0 && filter.priceTo > 0) {

        this.filteredEstate = this.filteredEstate.filter(x => x.price <= filter.priceTo)
      } else if (filter.priceFrom === filter.priceTo) {

      }



    })


  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  searchOnSell() {
    let filter =
    {
      id_city: "",
      id_transaction_type: { id: 1 },
      id_estate_category: "",
      id_estate_sub_category: ""
    }
    localStorage.setItem("filter", JSON.stringify(filter));
    this.router.navigate(['/filter'])
    location.reload()
  }

  searchOnRent() {
    let filter =
    {
      id_city: "",
      id_transaction_type: { id: 2 },
      id_estate_category: "",
      id_estate_sub_category: ""
    }
    localStorage.setItem("filter", JSON.stringify(filter));
    this.router.navigate(['/filter'])
    location.reload()
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
