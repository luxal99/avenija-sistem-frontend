import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';

import { Accessories } from 'src/app/models/Accessories';
import { AccessoriesService } from 'src/app/service/accessories.service';
import { AddAccessoriesDialogComponent } from './add-accessories-dialog/add-accessories-dialog.component';
import { AddCityDialogComponent } from './add-city-dialog/add-city-dialog.component';
import { AddEquipmentDialogComponent } from './add-equipment-dialog/add-equipment-dialog.component';
import { AddEstateCategoryDialogComponent } from './add-estate-category-dialog/add-estate-category-dialog.component';
import { AddEstateSubCategoryDialogComponent } from './add-estate-sub-category-dialog/add-estate-sub-category-dialog.component';
import { AddEstateTypeDialogComponent } from './add-estate-type-dialog/add-estate-type-dialog.component';
import { AddHeatingDialogComponent } from './add-heating-dialog/add-heating-dialog.component';
import { AddPartOfCityDialogComponent } from './add-part-of-city-dialog/add-part-of-city-dialog.component';
import { City } from 'src/app/models/CIty';
import { CityService } from 'src/app/service/city.service';
import { Equipment } from 'src/app/models/Equipment';
import { EquipmentService } from 'src/app/service/equipment.service';
import { EstateCategory } from 'src/app/models/EstateCategory';
import { EstateCategoryService } from 'src/app/service/estate-category.service';
import { EstateSubCategory } from 'src/app/models/EstateSubCategory';
import { EstateSubCategoryService } from 'src/app/service/estate-sub-category.service';
import { EstateType } from 'src/app/models/EstateType';
import { EstateTypeService } from 'src/app/service/estate-type.service';
import { Heating } from 'src/app/models/Heating';
import { HeatingService } from 'src/app/service/heating.service';
import { PartOfCity } from 'src/app/models/PartOfCity';
import { PartOfCityService } from 'src/app/service/part-of-city.service';

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
    public _snackBar: MatSnackBar,
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


  deleteCity(id:number){
    this.cityService.delete(id).subscribe(resp=>{
      this.getCities();
    },err =>{
      this.openSnackBar("Ne mozete izbrisati","DONE")
    })
  }


  deletePartOfCity(id:number){
    this.partOfCityService.delete(id).subscribe(resp=>{
      this.getPartsOfCities();
    },err =>{
      this.openSnackBar("Ne mozete izbrisati","DONE")
    })
  }


  deleteEstateCategory(id:number){
    this.estateCategoryService.delete(id).subscribe(resp=>{
      this.getEstateCategories();
    },err =>{
      this.openSnackBar("Ne mozete izbrisati","DONE")
    })
  }


  deleteEstateSubCategory(id:number){
    this.estateSubCategoryService.delete(id).subscribe(resp=>{
      this.getEstateSubCategories();
    },err =>{
      this.openSnackBar("Ne mozete izbrisati","DONE")
    })
  }


  deleteEstateType(id:number){
    this.estateTypeService.delete(id).subscribe(resp=>{
      this.getEstateTypes();
    },err =>{
      this.openSnackBar("Ne mozete izbrisati","DONE")
    })
  }

  deleteEquipment(id:number){
    this.equipmentService.delete(id).subscribe(resp=>{
      this.getEquipments();
    },err =>{
      this.openSnackBar("Ne mozete izbrisati","DONE")
    })
  }

  deleteAccessories(id:number){
    this.accessoriesService.delete(id).subscribe(resp=>{
      this.getAccessories();
    },err =>{
      this.openSnackBar("Ne mozete izbrisati","DONE")
    })
  }

  deleteHeating(id:number){
    this.heatingService.delete(id).subscribe(resp=>{
      this.getHeating();
    },err =>{
      this.openSnackBar("Ne mozete izbrisati","DONE")
    })
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
    });EstateTypeService
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


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
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
