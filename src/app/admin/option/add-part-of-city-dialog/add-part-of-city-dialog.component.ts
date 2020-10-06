import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  listOfCities:Array<City> = [];

  addPartOfCityForm = new FormGroup({
    title: new FormControl("", Validators.required),
    id_city: new FormControl("", Validators.required)
  })

  constructor(private cityService:CityService,private partOfCityService:PartOfCityService) { }

  ngOnInit() {
    this.getCities()
  }

  getCities() {
    this.cityService.getAll().subscribe(resp => {
      this.listOfCities = resp as Array<City>
    })
  }

  save(){
    this.partOfCityService.save(
      new PartOfCity(this.addPartOfCityForm.get("title").value,
                     this.addPartOfCityForm.get("id_city").value )
    ).subscribe(resp=>{
      
    })
  }
}
