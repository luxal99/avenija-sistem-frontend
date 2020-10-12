import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Accessories } from 'src/app/models/Accessories';
import { City } from 'src/app/models/CIty';
import { Equipment } from 'src/app/models/Equipment';
import { EstateCategory } from 'src/app/models/EstateCategory';
import { EstateSubCategory } from 'src/app/models/EstateSubCategory';
import { EstateType } from 'src/app/models/EstateType';
import { Heating } from 'src/app/models/Heating';
import { PartOfCity } from 'src/app/models/PartOfCity';
import { AccessoriesService } from 'src/app/service/accessories.service';
import { CityService } from 'src/app/service/city.service';
import { EquipmentService } from 'src/app/service/equipment.service';
import { EstateCategoryService } from 'src/app/service/estate-category.service';
import { EstateSubCategoryService } from 'src/app/service/estate-sub-category.service';
import { EstateTypeService } from 'src/app/service/estate-type.service';
import { HeatingService } from 'src/app/service/heating.service';
import { PartOfCityService } from 'src/app/service/part-of-city.service';
import { AddAccessoriesDialogComponent } from './add-accessories-dialog/add-accessories-dialog.component';
import { AddCityDialogComponent } from './add-city-dialog/add-city-dialog.component';
import { AddEquipmentDialogComponent } from './add-equipment-dialog/add-equipment-dialog.component';
import { AddEstateCategoryDialogComponent } from './add-estate-category-dialog/add-estate-category-dialog.component';
import { AddEstateSubCategoryDialogComponent } from './add-estate-sub-category-dialog/add-estate-sub-category-dialog.component';
import { AddEstateTypeDialogComponent } from './add-estate-type-dialog/add-estate-type-dialog.component';
import { AddHeatingDialogComponent } from './add-heating-dialog/add-heating-dialog.component';
import { AddPartOfCityDialogComponent } from './add-part-of-city-dialog/add-part-of-city-dialog.component';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.css']
})
export class OptionComponent implements OnInit {

  listOfCities: Array<City> = []
  listOfPartsOfCities: Array<PartOfCity> = [];
  listOfEstateCategories: Array<EstateCategory> = [];
  listOfEstateSubCategories: Array<EstateSubCategory> = [];
  listOfEstateTypes: Array<EstateType> = [];
  listOfEquipment: Array<Equipment> = [];
  listOfAccessories: Array<Accessories> = [];
  listOfHeating: Array<Heating> = [];



  constructor(private cityService: CityService,
    private equipmentService: EquipmentService,
    private heatingService: HeatingService,
    private accessoriesService: AccessoriesService,
    private partOfCityService: PartOfCityService,
    private estateTypeService: EstateTypeService,
    private dialog: MatDialog, private estateCategoryService: EstateCategoryService,
    private estateSubCategoryService: EstateSubCategoryService) { }

  async ngOnInit(): Promise<void> {
    this.getCities();
    this.getPartsOfCities();
    this.getEstateCategories();
    this.getEstateSubCategories();
    this.getEstateTypes();
    this.getAccessories();
    this.getHeating();
    this.getEquipments()
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

  getEstateCategories() {
    this.estateCategoryService.getAll().subscribe(resp => {
      this.listOfEstateCategories = resp as Array<EstateCategory>
    })
  }


  getEstateSubCategories() {
    this.estateSubCategoryService.getAll().subscribe(resp => {
      this.listOfEstateSubCategories = resp as Array<EstateSubCategory>
    })
  }

  getEstateTypes() {
    this.estateTypeService.getAll().subscribe(resp => {
      this.listOfEstateTypes = resp as Array<EstateType>
    })
  }

  getEquipments() {
    this.equipmentService.getAll().subscribe(resp => {
      this.listOfEquipment = resp as Array<Equipment>
    })
  }


  getAccessories() {
    this.accessoriesService.getAll().subscribe(resp => {
      this.listOfAccessories = resp as Array<Accessories>
    })
  }


  getHeating() {
    this.heatingService.getAll().subscribe(resp => {
      this.listOfHeating = resp as Array<Heating>
    })
  }
  openAddCityDialog(city?) {
    const dialogRef = this.dialog.open(AddCityDialogComponent, {
      width: 'auto',
      data: city
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCities();
      this.getPartsOfCities()
    });
  }

  openAddPartOfCityDialog(partOfCity) {
    const dialogRef = this.dialog.open(AddPartOfCityDialogComponent, {
      width: 'auto',
      data:partOfCity
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getPartsOfCities();
    });
  }


  openAddEstateCategoryDialog(estateCategory) {
    const dialogRef = this.dialog.open(AddEstateCategoryDialogComponent, {
      width: 'auto',
      data: estateCategory
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getEstateCategories();
      this.getEstateSubCategories();
    });
  }

  openAddEstateSubCategoryDialog(estateSubCategory) {
    const dialogRef = this.dialog.open(AddEstateSubCategoryDialogComponent, {
      width: 'auto',
      data: estateSubCategory
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getEstateSubCategories();
    });
  }
  openAddEstateTypeDialog(estateType) {
    const dialogRef = this.dialog.open(AddEstateTypeDialogComponent, {
      width: 'auto',
      data: estateType
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getEstateTypes();
    });
  }


  openAddEquipmentDialog(equipment?) {
    const dialogRef = this.dialog.open(AddEquipmentDialogComponent, {
      width: 'auto',
      data: equipment
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getEquipments();
    });
  }


  openAddAccessoriesDialog(acc) {
    const dialogRef = this.dialog.open(AddAccessoriesDialogComponent, {
      width: 'auto', data: acc
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAccessories();
    });
  }


  openAddHeatingDialog(heating) {
    const dialogRef = this.dialog.open(AddHeatingDialogComponent, {
      width: 'auto',
      data: heating
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getHeating();
    });
  }


  cityColumns: string[] = ['id', 'title', 'option'];
  partOfCityColumns: string[] = ['id', 'title', 'city', 'option'];
  estateCategoryColumns: string[] = ['id', 'title', 'option'];
  estateTypeColumns: string[] = ['id', 'title', 'option'];
  estateSubCategoryColumns: string[] = ['id', 'title', 'estate_category', 'option'];
  accColumns: string[] = ['id', 'title', 'option'];
  eqColumns: string[] = ['id', 'title', 'option'];
  heatingColumns: string[] = ['id', 'title', 'option'];
}
