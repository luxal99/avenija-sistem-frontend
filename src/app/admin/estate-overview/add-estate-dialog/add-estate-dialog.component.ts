import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import { Accessories } from 'src/app/models/Accessories';
import { City } from 'src/app/models/CIty';
import { Equipment } from 'src/app/models/Equipment';
import { EstateCategory } from 'src/app/models/EstateCategory';
import { EstateSubCategory } from 'src/app/models/EstateSubCategory';
import { EstateType } from 'src/app/models/EstateType';
import { Heating } from 'src/app/models/Heating';
import { PartOfCity } from 'src/app/models/PartOfCity';
import { Transaction } from 'src/app/models/Transaction';
import { AccessoriesService } from 'src/app/service/accessories.service';
import { CityService } from 'src/app/service/city.service';
import { EquipmentService } from 'src/app/service/equipment.service';
import { EstateCategoryService } from 'src/app/service/estate-category.service';
import { EstateSubCategoryService } from 'src/app/service/estate-sub-category.service';
import { EstateTypeService } from 'src/app/service/estate-type.service';
import { HeatingService } from 'src/app/service/heating.service';
import { PartOfCityService } from 'src/app/service/part-of-city.service';
import { TransactionService } from 'src/app/service/transaction.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-add-estate-dialog',
  templateUrl: './add-estate-dialog.component.html',
  styleUrls: ['./add-estate-dialog.component.css']
})
export class AddEstateDialogComponent implements OnInit {

  @ViewChild('editor', { static: false }) editorComponent: CKEditorComponent;
  public Editor = ClassicEditor;

  listOfTransaction: Array<Transaction> = [];
  listOfCities: Array<City> = []
  listOfPartsOfCities: Array<PartOfCity> = [];
  listOfEstateCategories: Array<EstateCategory> = [];
  listOfEstateSubCategories: Array<EstateSubCategory> = [];
  listOfEstateTypes: Array<EstateType> = [];
  listOfEquipment: Array<Equipment> = [];
  listOfAccessories: Array<Accessories> = [];
  listOfHeating: Array<Heating> = [];

  firstFormGroup = new FormGroup({
    id_transaction_type: new FormControl("", Validators.required),
    id_estate_sub_category: new FormControl("", Validators.required)
  })

  locationForm = new FormGroup({
    id_city: new FormControl("", Validators.required),
    id_part_of_city: new FormControl("", Validators.required),
    address: new FormControl("", Validators.required)
  });

  thirdStepForm = new FormGroup({
    price: new FormControl("",Validators.required),
    quadrature: new FormControl("",Validators.required),
    id_estate_type: new FormControl("",Validators.required)
  })

  accessoriesForm = new FormGroup({
    id_equipment: new FormControl("",Validators.required),
    id_heating:new FormControl("",Validators.required),
    floor: new FormControl("",Validators.required),
    max_floor : new FormControl("",Validators.required),
    rooms: new FormControl("",Validators.required),
    num_of_bathrooms: new FormControl("",Validators.required),
    accesory: new FormControl("",Validators.required)
  })


  constructor(private transactionService: TransactionService,
    private cityService: CityService,
    private equipmentService: EquipmentService,
    private heatingService: HeatingService,
    private accessoriesService: AccessoriesService,
    private partOfCityService: PartOfCityService,
    private estateTypeService: EstateTypeService,
    private dialog: MatDialog, private estateCategoryService: EstateCategoryService,
    private estateSubCategoryService: EstateSubCategoryService) { }

  ngOnInit() {
    this.getAllTransaction()
    this.getCities();
    this.getPartsOfCities();
    this.getEstateCategories();
    this.getEstateSubCategories();
    this.getEstateTypes();
    this.getAccessories();
    this.getHeating();
    this.getEquipments()
  }

  async filterPartOfCity() {

    this.listOfPartsOfCities = JSON.parse(localStorage.getItem("POC"))
    let city: City = this.locationForm.get("id_city").value;
    this.listOfPartsOfCities = this.listOfPartsOfCities.filter(x => x.id_city.id === city.id)
  
  }

  getCities() {
    this.cityService.getAll().subscribe(resp => {
      this.listOfCities = resp as Array<City>
    })
  }


  getPartsOfCities() {
    this.partOfCityService.getAll().subscribe(resp => {
      this.listOfPartsOfCities = resp as Array<PartOfCity>
      localStorage.setItem("POC", JSON.stringify(this.listOfPartsOfCities))
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

  getAllTransaction() {
    this.transactionService.getAll().subscribe(resp => {
      this.listOfTransaction = resp as Array<Transaction>
    })
  }

}
