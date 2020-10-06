import { Component, OnInit } from '@angular/core';
import { City } from 'src/app/models/CIty';
import { PartOfCity } from 'src/app/models/PartOfCity';
import { CityService } from 'src/app/service/city.service';
import { PartOfCityService } from 'src/app/service/part-of-city.service';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.css']
})
export class OptionComponent implements OnInit {

  listOfCities: Array<City> = []
  listOfPartsOfCities: Array<PartOfCity> = [];

  constructor(private cityService: CityService,private partOfCityService:PartOfCityService) { }

  async ngOnInit(): Promise<void> {
    this.getCities();
    this.getPartsOfCities()
  }

  getCities() {
    this.cityService.getAll().subscribe(resp => {
      this.listOfCities = resp as Array<City>
    })
  }


  getPartsOfCities() {
    this.partOfCityService.getAll().subscribe(resp => {
      this.listOfPartsOfCities = resp as Array<PartOfCity>
    })
  }
  cityColumns: string[] = ['id', 'title'];
  partOfCityColumns: string[] = ['id', 'title','city'];
}
