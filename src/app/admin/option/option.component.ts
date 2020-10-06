import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { City } from 'src/app/models/CIty';
import { PartOfCity } from 'src/app/models/PartOfCity';
import { CityService } from 'src/app/service/city.service';
import { PartOfCityService } from 'src/app/service/part-of-city.service';
import { AddCityDialogComponent } from './add-city-dialog/add-city-dialog.component';
import { AddPartOfCityDialogComponent } from './add-part-of-city-dialog/add-part-of-city-dialog.component';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.css']
})
export class OptionComponent implements OnInit {

  listOfCities: Array<City> = []
  listOfPartsOfCities: Array<PartOfCity> = [];

  constructor(private cityService: CityService,
    private partOfCityService:PartOfCityService,private dialog:MatDialog) { }

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

  openAddCityDialog() {
    const dialogRef = this.dialog.open(AddCityDialogComponent, {
      width: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCities();
    });
  }

  openAddPartOfCityDialog() {
    const dialogRef = this.dialog.open(AddPartOfCityDialogComponent, {
      width: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getPartsOfCities();
    });
  }
  cityColumns: string[] = ['id', 'title'];
  partOfCityColumns: string[] = ['id', 'title','city'];
}
