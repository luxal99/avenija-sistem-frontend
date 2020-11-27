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
  filteredEstate: Array<Filter> = [];

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
    // var filter: Filter = JSON.parse(localStorage.getItem("filter"));
    // this.selectedCity = filter.id_city.id
  }

  getAllEstates() {

    var filter: Filter = JSON.parse(localStorage.getItem("filter"))
    this.searchForm.get("priceFrom").setValue(filter.priceFrom)
    this.searchForm.get("priceTo").setValue(filter.priceTo)


    let map = new Map(Object.entries(filter))

    this.estateService.getAll().subscribe(resp => {
      this.listOfEstates = resp as Array<Estate>
      let estateFilterList: Array<Filter> = this.listOfEstates.map(estate => (new Filter(estate.id, estate.price, estate.quadrature, estate.id_location.id_part_of_city.id_city.title, estate.id_location.id_part_of_city.title,
        estate.id_transaction_type.title, estate.id_estate_sub_category.id_estate_category.title, estate.listOfImages[0].url, estate.title, estate.id_location.address)))


      let v1 = Object.values(filter['basic']);

      for (let estate of estateFilterList) {
        let v2 = Object.values(estate);

        if (v1.every(x => v2.includes(x))) {
          this.filteredEstate.push(estate)
        }

        console.log(filter);
        
        if (filter.priceTo !== undefined && filter.priceFrom !== undefined) {
          this.filteredEstate = this.filteredEstate.filter(x => x._price >= filter.priceFrom && x._price <= filter.priceTo)
        }



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
