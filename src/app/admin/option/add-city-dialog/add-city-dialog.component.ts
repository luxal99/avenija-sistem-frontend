import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor(private cityService: CityService) { }

  ngOnInit() {
  }





  save() {
    this.cityService.save(new City(this.addCityForm.get("title").value)).subscribe(resp => {
      console.log(resp);

    })
  }

}
