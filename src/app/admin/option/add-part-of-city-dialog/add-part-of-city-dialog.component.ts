import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { City } from 'src/app/models/CIty';
import { PartOfCity } from 'src/app/models/PartOfCity';
import { CityService } from 'src/app/service/city.service';
import { PartOfCityService } from 'src/app/service/part-of-city.service';

@Component({
  selector: 'app-add-part-of-city-dialog',
  templateUrl: './add-part-of-city-dialog.component.html',
  styleUrls: ['./add-part-of-city-dialog.component.css']
})
export class AddPartOfCityDialogComponent implements OnInit {

  listOfCities: Array<City> = [];

  addPartOfCityForm = new FormGroup({
    title: new FormControl("", Validators.required),
    id_city: new FormControl("", Validators.required)
  })

  selectedCity;

  constructor(private cityService: CityService, @Inject(MAT_DIALOG_DATA) public data: PartOfCity, private partOfCityService: PartOfCityService) { }

  ngOnInit() {
    this.setValue();
    this.getCities()

  }

  setValue() {

    if (this.data.id)
      this.selectedCity = this.data.id_city.id
    this.addPartOfCityForm.get("title").setValue(this.data.title)
  }

  getCities() {
    this.cityService.getAll().subscribe(resp => {
      this.listOfCities = resp as Array<City>
    })
  }

  save() {
    if (this.data.id) {

      let partOfCity = new PartOfCity
        (this.addPartOfCityForm.get("title").value,
          this.addPartOfCityForm.get("id_city").value)

      partOfCity.id = this.data.id

      this.partOfCityService.update(partOfCity).subscribe(resp => {

      })

    } else {
      this.partOfCityService.save(
        new PartOfCity(this.addPartOfCityForm.get("title").value,
          this.addPartOfCityForm.get("id_city").value)
      ).subscribe(resp => {

      })
    }
  }
}
