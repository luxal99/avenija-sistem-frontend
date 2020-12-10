import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';

import { City } from 'src/app/models/CIty';
import { CityService } from 'src/app/service/city.service';
import { Estate } from 'src/app/models/Estate';
import { EstateCategory } from 'src/app/models/EstateCategory';
import { EstateCategoryService } from 'src/app/service/estate-category.service';
import { EstateDTO } from 'src/app/models/EstateDTO';
import { EstateProperty } from 'src/app/models/EstateProperty';
import { EstateService } from 'src/app/service/estate.service';
import { Filter } from 'src/app/models/Filter';
import { PartOfCity } from 'src/app/models/PartOfCity';
import { PartOfCityService } from 'src/app/service/part-of-city.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.css']
})
export class FilterDialogComponent implements OnInit {

  constructor(private estateService: EstateService,
    public _snackBar: MatSnackBar,
    private router: Router,
    private partOfCityService: PartOfCityService,
    private cityService: CityService, private dialog: MatDialog, private estateCategoryService: EstateCategoryService) { }

  ngOnInit() {
    this.setValue();
    this.getCities();
    this.getEstateCategories();
    this.getPartsOfCities();
    this.filterPartOfCity();
  }


  selectedCity;
  searchText = ''

  searchForm = new FormGroup({
    priceFrom: new FormControl(""),
    priceTo: new FormControl(""),
    id_city: new FormControl(""),
    searchPartOfCity:new FormControl(""),
    quadratureFrom: new FormControl(""),
    quadratureTo: new FormControl(""),
    id_part_of_city: new FormControl(""),
    id_estate_category: new FormControl("")
  })
  
  listOfEstates: Array<Estate> = [];
  filteredEstate: Array<EstateDTO> = [];
  listOfEstateCategories: Array<EstateCategory> = []

  listOfCities: Array<City> = []
  listOfPartsOfCities: Array<PartOfCity> = [];

  filteredPartOfCity: Array<PartOfCity> = []


  reset() {
    this.searchForm.get('priceFrom').setValue("");
    this.searchForm.get('priceTo').setValue("");
    this.searchForm.get('id_city').setValue("");
    this.searchForm.get('id_part_of_city').setValue("");

  }

  getEstateCategories() {
    this.estateCategoryService.getAll().subscribe(resp => {
      this.listOfEstateCategories = resp as Array<EstateCategory>
    }, err => {
    })
  }

    filter() {

    document.getElementById('filter-spinner').style.display = 'block'
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
    })
  }

  getPartsOfCities() {
    this.partOfCityService.getAll().subscribe(resp => {
      this.listOfPartsOfCities = resp as Array<PartOfCity>
      localStorage.setItem("POC", JSON.stringify(this.listOfPartsOfCities))
    }, err => {
    })
  }

  setValue(){


    let filter: Filter = JSON.parse(localStorage.getItem("filter"))
    this.searchForm.get('id_estate_category').setValue(filter.estateProperty.id_estate_category);
    this.selectedCity = filter.estateProperty.id_city
  }

}
