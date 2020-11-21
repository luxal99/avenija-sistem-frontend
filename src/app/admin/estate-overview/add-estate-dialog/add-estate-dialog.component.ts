import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as imageCompression from 'browser-image-compression'

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange, MatDialog, MatSlideToggle, MatSnackBar } from '@angular/material';

import { Accessories } from 'src/app/models/Accessories';
import { AccessoriesService } from 'src/app/service/accessories.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import { City } from 'src/app/models/CIty';
import { CityService } from 'src/app/service/city.service';
import { Equipment } from 'src/app/models/Equipment';
import { EquipmentService } from 'src/app/service/equipment.service';
import { Estate } from 'src/app/models/Estate';
import { EstateCategory } from 'src/app/models/EstateCategory';
import { EstateCategoryService } from 'src/app/service/estate-category.service';
import { EstateService } from 'src/app/service/estate.service';
import { EstateSubCategory } from 'src/app/models/EstateSubCategory';
import { EstateSubCategoryService } from 'src/app/service/estate-sub-category.service';
import { EstateType } from 'src/app/models/EstateType';
import { EstateTypeService } from 'src/app/service/estate-type.service';
import { Heating } from 'src/app/models/Heating';
import { HeatingService } from 'src/app/service/heating.service';
import { ImageModel } from 'src/app/models/ImageModel';
import { Location } from 'src/app/models/Location';
import { LocationService } from 'src/app/service/location.service';
import { PartOfCity } from 'src/app/models/PartOfCity';
import { PartOfCityService } from 'src/app/service/part-of-city.service';
import { Transaction } from 'src/app/models/Transaction';
import { TransactionService } from 'src/app/service/transaction.service';
import { async } from '@angular/core/testing';

const Compress = require('compress.js')

@Component({
  selector: 'app-add-estate-dialog',
  templateUrl: './add-estate-dialog.component.html',
  styleUrls: ['./add-estate-dialog.component.css']
})
export class AddEstateDialogComponent implements OnInit {

  @ViewChild('editor', { static: false }) editorComponent: CKEditorComponent;
  public Editor = ClassicEditor;


  editorData = '';
  description = '';
  AngularFireModule
  percentage: number = 0;
  isReady = 'Nije spremno';

  listOfTransaction: Array<Transaction> = [];
  listOfCities: Array<City> = []
  listOfPartsOfCities: Array<PartOfCity> = [];
  listOfEstateCategories: Array<EstateCategory> = [];
  listOfEstateSubCategories: Array<EstateSubCategory> = [];
  listOfEstateTypes: Array<EstateType> = [];
  listOfEquipment: Array<Equipment> = [];
  listOfAccessories: Array<Accessories> = [];
  listOfHeating: Array<Heating> = [];
  listOfImages: Array<ImageModel> = [];
  fileUploadList: Array<any> = [];
  listOfSelectedAccessories = new Set<Accessories>();

  firstFormGroup = new FormGroup({
    id_transaction_type: new FormControl("", Validators.required),
    id_estate_sub_category: new FormControl("", Validators.required)
  })

  locationForm = new FormGroup({
    id_city: new FormControl("", Validators.required),
    id_part_of_city: new FormControl("", Validators.required),
    address: new FormControl("")
  });

  thirdStepForm = new FormGroup({
    price: new FormControl(0, Validators.required),
    quadrature: new FormControl(0, Validators.required),
    id_estate_type: new FormControl("", Validators.required)
  })

  accessoriesForm = new FormGroup({
    id_equipment: new FormControl("", Validators.required),
    id_heating: new FormControl("", Validators.required),
    floor: new FormControl(0, Validators.required),
    max_floor: new FormControl(0, Validators.required),
    rooms: new FormControl(0, Validators.required),
    num_of_bathrooms: new FormControl(0, Validators.required),
    accesory: new FormControl("", Validators.required),
  })

  titleForm = new FormGroup({
    title: new FormControl("", Validators.required)
  })

  imageForm = new FormGroup({
    isUploaded: new FormControl("", Validators.required)
  })

  constructor(private transactionService: TransactionService,
    private cityService: CityService,
    private equipmentService: EquipmentService,
    private heatingService: HeatingService,
    private locationService: LocationService,
    private estateService: EstateService,
    public _snackBar: MatSnackBar,
    private afStorage: AngularFireStorage,
    private accessoriesService: AccessoriesService,
    private partOfCityService: PartOfCityService,
    private estateTypeService: EstateTypeService,
    private dialog: MatDialog,
    private estateCategoryService: EstateCategoryService,
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

  async addFiles(event) {
    for (let index = 0; index < event.length; index++) {

      const element = event[index];

      var elementIndex = this.fileUploadList.indexOf(element);
      if (elementIndex === -1) {
        this.fileUploadList.push(element)
      }
    }


    await this.uploadFiles();
  }

  addAccessories($event: MatCheckboxChange, accessories: Accessories) {
    var c = (($event.checked)) ? this.listOfSelectedAccessories.add(accessories) : this.listOfSelectedAccessories.delete(accessories);
  }

  async uploadFiles() {


    document.getElementById('spinner').style.display = 'block'

    for (const file of this.fileUploadList) {
      this.afStorage.upload(file.name, file)
        .then(async () => {
          const downloadUrl = await this.afStorage.ref(file.name).getDownloadURL().subscribe(async data => {

            document.getElementById('spinner').style.display = 'none'
            this.listOfImages.push(new ImageModel(file.name, data));

          });
        })
    }

    this.fileUploadList = []

  }


  async disableSpinner() {
    document.getElementById('spinner').style.display = 'none'
  }

  async filterPartOfCity() {

    this.listOfPartsOfCities = JSON.parse(localStorage.getItem("POC"))
    let city: City = this.locationForm.get("id_city").value;
    this.listOfPartsOfCities = this.listOfPartsOfCities.filter(x => x.id_city.id === city.id)

  }

  getCities() {
    this.cityService.getAll().subscribe(resp => {
      this.listOfCities = resp as Array<City>
    }, err => {
      this.openSnackBar("Dogodila se greska", "AGAIN")
    })
  }

  deletePhoto(photo) {
    var index = this.listOfImages.indexOf(photo);
    this.listOfImages.splice(index, 1)
  }


  getPartsOfCities() {
    this.partOfCityService.getAll().subscribe(resp => {
      this.listOfPartsOfCities = resp as Array<PartOfCity>
      localStorage.setItem("POC", JSON.stringify(this.listOfPartsOfCities))
    }, err => {
      this.openSnackBar("Dogodila se greska", "AGAIN")
    })
  }

  getEstateCategories() {
    this.estateCategoryService.getAll().subscribe(resp => {
      this.listOfEstateCategories = resp as Array<EstateCategory>
    }, err => {
      this.openSnackBar("Dogodila se greska", "AGAIN")
    })
  }


  getEstateSubCategories() {
    this.estateSubCategoryService.getAll().subscribe(resp => {
      this.listOfEstateSubCategories = resp as Array<EstateSubCategory>
    }, err => {
      this.openSnackBar("Dogodila se greska", "AGAIN")
    })
  }

  getEstateTypes() {
    this.estateTypeService.getAll().subscribe(resp => {
      this.listOfEstateTypes = resp as Array<EstateType>
    }, err => {
      this.openSnackBar("Dogodila se greska", "AGAIN")
    })
  }

  getEquipments() {
    this.equipmentService.getAll().subscribe(resp => {
      this.listOfEquipment = resp as Array<Equipment>
    }, err => {
      this.openSnackBar("Dogodila se greska", "AGAIN")
    })
  }


  getAccessories() {
    this.accessoriesService.getAll().subscribe(resp => {
      this.listOfAccessories = resp as Array<Accessories>
    }, err => {
      this.openSnackBar("Dogodila se greska", "AGAIN")
    })
  }


  getHeating() {
    this.heatingService.getAll().subscribe(resp => {
      this.listOfHeating = resp as Array<Heating>
    }, err => {
      this.openSnackBar("Dogodila se greska", "AGAIN")
    })
  }

  getAllTransaction() {
    this.transactionService.getAll().subscribe(resp => {
      this.listOfTransaction = resp as Array<Transaction>
    }, err => {
      this.openSnackBar("Dogodila se greska", "AGAIN")
    })
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }


  save() {

    let estate = new Estate();

    estate.title = this.titleForm.get("title").value;
    estate.description = this.editorComponent.editorInstance.getData();
    estate.price = this.thirdStepForm.get("price").value;
    estate.quadrature = this.thirdStepForm.get("quadrature").value;
    estate.num_of_bathrooms = this.accessoriesForm.get("num_of_bathrooms").value;
    estate.floor = this.accessoriesForm.get("floor").value;
    estate.max_floor = this.accessoriesForm.get("max_floor").value;
    estate.rooms = this.accessoriesForm.get("rooms").value;
    estate.parking = true;

    estate.id_estate_sub_category = this.firstFormGroup.get("id_estate_sub_category").value;
    estate.id_transaction_type = this.firstFormGroup.get("id_transaction_type").value;
    estate.id_heating = this.accessoriesForm.get("id_heating").value;
    estate.id_estate_type = this.thirdStepForm.get("id_estate_type").value;
    estate.id_equipment = this.accessoriesForm.get("id_equipment").value;

    this.locationService.save(new Location(this.locationForm.get("address").value, this.locationForm.get("id_part_of_city").value)).subscribe(resp => {
      estate.id_location = resp as Location
      estate.listOfImages = this.listOfImages;
      estate.listOfAccessories = Array.from(this.listOfSelectedAccessories);


      console.log(estate.listOfAccessories);
      console.log(this.listOfSelectedAccessories);
      
      

      this.estateService.save(estate).subscribe(resp => {
        this.openSnackBar("Uspesno ste sacuvali oglas", "DONE")
      }, err => {
        console.log(err);
        console.log(estate);

        this.openSnackBar("Dogodila se greska", "AGAIN")
      })
    });

  }


}
