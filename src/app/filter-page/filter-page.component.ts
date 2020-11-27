import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';

import { City } from '../models/CIty';
import { CityService } from '../service/city.service';
import { Estate } from '../models/Estate';
import { EstateCategory } from '../models/EstateCategory';
import { EstateCategoryService } from '../service/estate-category.service';
import { EstateDTO } from '../models/EstateDTO';
import { EstateProperty } from '../models/EstateProperty';
import { EstateService } from '../service/estate.service';
import { EstateSubCategoryService } from '../service/estate-sub-category.service';
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
    priceFrom: new FormControl(""),
    priceTo: new FormControl(""),
    id_city: new FormControl(""),
    quadratureFrom: new FormControl(""),
    quadratureTo: new FormControl(""),
    id_part_of_city: new FormControl(""),
    id_estate_category: new FormControl("")
  })

  selectedCity;

  listOfEstates: Array<Estate> = [];
  filteredEstate: Array<EstateDTO> = [];
  listOfEstateCategories: Array<EstateCategory> = []

  listOfCities: Array<City> = []
  listOfPartsOfCities: Array<PartOfCity> = [];

  filteredPartOfCity: Array<PartOfCity> = []

  constructor(private estateService: EstateService,
    public _snackBar: MatSnackBar,
    private router: Router,
    private partOfCityService: PartOfCityService,
    private cityService: CityService, private dialog: MatDialog, private estateCategoryService: EstateCategoryService) { }

  ngOnInit() {
    this.getAllEstates();
    this.getCities();
    this.getEstateCategories();
    this.getPartsOfCities();
    this.filterPartOfCity();
  }


  reset() {
    this.searchForm.get('priceFrom').setValue("");
    this.searchForm.get('priceTo').setValue("");
    this.searchForm.get('id_city').setValue("");
    this.searchForm.get('id_part_of_city').setValue("");


    this.getAllEstates();
  }

  getEstateCategories() {
    this.estateCategoryService.getAll().subscribe(resp => {
      this.listOfEstateCategories = resp as Array<EstateCategory>
    }, err => {
      this.openSnackBar("Dogodila se greska", "AGAIN")
    })
  }


  filter() {

    let oldFilter: Filter = JSON.parse(localStorage.getItem("filter"))
    let filter = new Filter()
    filter.priceTo = Number.parseInt(this.searchForm.get("priceTo").value)
    filter.priceFrom = Number.parseInt(this.searchForm.get("priceFrom").value);
    filter.quadratureFrom = Number.parseInt(this.searchForm.get("quadratureFrom").value);
    filter.quadratureTo = Number.parseInt(this.searchForm.get("quadratureTo").value);
    let estateProperty = new EstateProperty()
    estateProperty.id_estate_category = this.searchForm.get("id_estate_category").value
    estateProperty.id_city = this.searchForm.get("id_city").value
    estateProperty.id_part_of_city = this.searchForm.get("id_part_of_city").value

    filter.estateProperty = estateProperty
    for (const [k1, v1] of Object.entries(filter.estateProperty)) {

      if (!v1 || v1 === "undefinded") {
        delete filter.estateProperty[k1]
      }
    }
    for (const [k2, v2] of Object.entries(filter)) {
      if (!v2) {
        delete filter[k2]
      }
    }

    localStorage.removeItem("filter")

    filter.estateProperty.id_transaction_type = oldFilter.estateProperty.id_transaction_type

    localStorage.setItem("filter", JSON.stringify(filter))

    this.getAllEstates();


  }

  filterPartOfCity() {

    this.listOfPartsOfCities = JSON.parse(localStorage.getItem("POC"))
    const title: string = this.searchForm.get("id_city").value;

    this.filteredPartOfCity = this.listOfPartsOfCities.filter(x => x.id_city.title === title)

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


  getAllEstates() {

    this.filteredEstate = []
    let filter: Filter = JSON.parse(localStorage.getItem("filter"))

    this.estateService.getAll().subscribe(resp => {
      this.listOfEstates = resp as Array<Estate>
      let estateFilterList: Array<EstateDTO>
        = this.listOfEstates.map
          (estate =>
            (new EstateDTO(
              estate.id,
              estate.price, estate.quadrature, estate.id_location.id_part_of_city.id_city.title,
              estate.id_location.id_part_of_city.title,
              estate.id_transaction_type.title, estate.id_estate_sub_category.id_estate_category.title,
              estate.listOfImages[0].url, estate.title, estate.id_location.address)))

      let filterValues = Object.values(filter.estateProperty);

      for (let estate of estateFilterList) {
        if (filterValues.every(x => Object.values(estate).includes(x))) {
          this.filteredEstate.push(estate)
        }

        if (filter.priceTo !== undefined && filter.priceFrom !== undefined) {
          this.filteredEstate = this.filteredEstate.filter(x => x._price >= filter.priceFrom && x._price <= filter.priceTo)
        } else if (filter.priceTo !== undefined && filter.priceFrom === undefined) {
          this.filteredEstate = this.filteredEstate.filter(x => x._price <= filter.priceTo)
        } else if (filter.priceTo === undefined && filter.priceFrom !== undefined) {
          this.filteredEstate = this.filteredEstate.filter(x => x._price >= filter.priceFrom)
        }

        if (filter.quadratureTo !== undefined && filter.quadratureFrom !== undefined) {
          this.filteredEstate = this.filteredEstate.filter(x => x._quadrature >= filter.quadratureFrom && x._quadrature <= filter.quadratureTo)
        } else if (filter.quadratureTo !== undefined && filter.quadratureFrom === undefined) {
          this.filteredEstate = this.filteredEstate.filter(x => x._quadrature <= filter.quadratureTo)
        } else if (filter.quadratureTo === undefined && filter.quadratureFrom !== undefined) {
          this.filteredEstate = this.filteredEstate.filter(x => x._quadrature >= filter.quadratureFrom)
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
