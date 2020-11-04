import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { City } from 'src/app/models/CIty';
import { CityService } from 'src/app/service/city.service';

@Component({
  selector: 'app-add-city-dialog',
  templateUrl: './add-city-dialog.component.html',
  styleUrls: ['./add-city-dialog.component.css']
})
export class AddCityDialogComponent implements OnInit {


  addCityForm = new FormGroup({
    title: new FormControl("", Validators.required)
  })

  constructor(private cityService: CityService, @Inject(MAT_DIALOG_DATA) public data: City) { }

  ngOnInit() {
    this.setValue();
  }


  setValue() {
    if (this.data.id)
      this.addCityForm.get("title").setValue(this.data.title)
  }
  save() {
    if (this.data.id) {
      let city = new City(this.addCityForm.get("title").value);
      city.id = this.data.id;

      this.cityService.update(city).subscribe(resp => {

      })

    } else {
      this.cityService.save(new City(this.addCityForm.get("title").value)).subscribe(resp => {
 
      })
    }
  }

}
