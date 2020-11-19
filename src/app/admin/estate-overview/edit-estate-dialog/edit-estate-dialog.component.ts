import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatCheckbox, MatCheckboxChange, MatDialog, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Accessories } from 'src/app/models/Accessories';
import { City } from 'src/app/models/CIty';
import { Equipment } from 'src/app/models/Equipment';
import { Estate } from 'src/app/models/Estate';
import { Location } from 'src/app/models/Location'
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
import { EstateService } from 'src/app/service/estate.service';
import { HeatingService } from 'src/app/service/heating.service';
import { LocationService } from 'src/app/service/location.service';
import { PartOfCityService } from 'src/app/service/part-of-city.service';
import { TransactionService } from 'src/app/service/transaction.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import { ImageModel } from 'src/app/models/ImageModel'
import { AccessoriesDTO } from 'src/app/models/AccessoriesDTO';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-edit-estate-dialog',
  templateUrl: './edit-estate-dialog.component.html',
  styleUrls: ['./edit-estate-dialog.component.css']
})
export class EditEstateDialogComponent implements OnInit {

  @ViewChild('editor', { static: false }) editorComponent: CKEditorComponent;
  public Editor = ClassicEditor;

  @ViewChild('checkBox', { static: false }) checkBox: MatCheckbox;



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
    price: new FormControl("", Validators.required),
    quadrature: new FormControl("", Validators.required),
    id_estate_type: new FormControl("", Validators.required)
  })

  accessoriesForm = new FormGroup({
    id_equipment: new FormControl("", Validators.required),
    id_heating: new FormControl("", Validators.required),
    floor: new FormControl("", Validators.required),
    max_floor: new FormControl("", Validators.required),
    rooms: new FormControl("", Validators.required),
    num_of_bathrooms: new FormControl("", Validators.required),
    accesory: new FormControl("", Validators.required),
  })

  titleForm = new FormGroup({
    title: new FormControl("", Validators.required)
  })


  imageForm = new FormGroup({
    isUploaded: new FormControl("", Validators.required)
  })

  selectedSubCategory;
  selectedCity;
  selectedPartOfCity;
  selectedHeating;
  selectedEstateType;
  selectedEquipment;
  selectedAccessories: Array<AccessoriesDTO> = []

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
  fileUploadList: Array<File> = [];
  listOfSelectedAccessories: Array<Accessories> = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: Estate, private transactionService: TransactionService,
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
    this.setValuesToForm();
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

    var index = this.listOfSelectedAccessories.indexOf(accessories)


    if ($event.checked && index === -1) {
      this.listOfSelectedAccessories.push(accessories)
    } else {
      this.listOfSelectedAccessories.splice(index, 1)
    }
  }

  errorHandler(event) {
    console.debug(event);
    event.target.src = "https://cdn.browshot.com/static/images/not-found.png";
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

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.listOfImages, event.previousIndex, event.currentIndex);
  }

  disableSpinner(timeOut) {
    document.getElementById('spinner').style.display = 'block'

    setTimeout(() => {
      document.getElementById('spinner').style.display = 'none'
    }, timeOut);
  }

  async filterPartOfCity() {

    this.listOfPartsOfCities = JSON.parse(localStorage.getItem("POC"))
    let city = new City();
    city.id = this.locationForm.get("id_city").value;
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
    let index = this.listOfImages.indexOf(photo);
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

      for (const acc of this.listOfAccessories) {
        const accDto = new AccessoriesDTO(acc, false);
        var index = this.data.listOfAccessories.findIndex(x => x.id === acc.id);

        if (index !== -1) {
          accDto.checked = true
        }

        this.selectedAccessories.push(accDto)
      }

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


  setValuesToForm() {
    this.firstFormGroup.get("id_transaction_type").setValue(this.data.id_transaction_type);
    this.firstFormGroup.get("id_estate_sub_category").setValue(this.data.id_estate_sub_category);
    this.locationForm.get("address").setValue(this.data.id_location.address)
    this.thirdStepForm.get("quadrature").setValue(this.data.quadrature)
    this.thirdStepForm.get("price").setValue(this.data.price);
    this.titleForm.get("title").setValue(this.data.title);
    this.accessoriesForm.get("floor").setValue(this.data.floor);
    this.accessoriesForm.get("max_floor").setValue(this.data.max_floor);
    this.accessoriesForm.get("num_of_bathrooms").setValue(this.data.num_of_bathrooms);
    this.accessoriesForm.get("rooms").setValue(this.data.rooms)


    this.selectedSubCategory = this.data.id_estate_sub_category.id;
    this.selectedCity = this.data.id_location.id_part_of_city.id_city.id;
    this.selectedCity = this.data.id_location.id_part_of_city.id_city.id;
    this.selectedPartOfCity = this.data.id_location.id_part_of_city.id;
    this.selectedEstateType = this.data.id_estate_type.id;


    if (this.data.id_equipment !== null) {
      this.selectedEquipment = this.data.id_equipment.id;
    } else if (this.data.id_heating !== null) {

      this.selectedHeating = this.data.id_heating.id;
    }

    this.listOfSelectedAccessories = this.data.listOfAccessories
    this.listOfImages = this.data.listOfImages

    setTimeout(() => {
      this.setDescription();

    }, 100);


  }



  update() {

    let estate = new Estate();
    let estateSubCategory = new EstateSubCategory();
    let heating = new Heating();
    let estateType = new EstateType();
    let equipment = new Equipment();
    let id_part_of_city = new PartOfCity();
    let id_location = new Location()


    estateSubCategory.id = this.firstFormGroup.get("id_estate_sub_category").value;
    heating.id = this.accessoriesForm.get("id_heating").value;
    estateType.id = this.thirdStepForm.get("id_estate_type").value;
    equipment.id = this.accessoriesForm.get("id_equipment").value;

    // Location
    id_part_of_city.id = this.locationForm.get("id_part_of_city").value;
    id_location.id = this.data.id_location.id;
    id_location.id_part_of_city = id_part_of_city
    id_location.address = this.locationForm.get("address").value

    estate.title = this.titleForm.get("title").value;
    estate.description = this.editorComponent.editorInstance.getData();
    estate.price = this.thirdStepForm.get("price").value;
    estate.quadrature = this.thirdStepForm.get("quadrature").value;
    estate.num_of_bathrooms = this.accessoriesForm.get("num_of_bathrooms").value;
    estate.floor = this.accessoriesForm.get("floor").value;
    estate.max_floor = this.accessoriesForm.get("max_floor").value;
    estate.rooms = this.accessoriesForm.get("rooms").value;
    estate.parking = true;

    estate.id_estate_sub_category = estateSubCategory;
    estate.id_transaction_type = this.firstFormGroup.get("id_transaction_type").value;
    estate.id_heating = heating;
    estate.id_estate_type = estateType;
    estate.id_equipment = equipment;

    estate.listOfImages = this.listOfImages;
    estate.listOfAccessories = this.listOfSelectedAccessories;
    estate.id_location = id_location
    estate.id = this.data.id

    estate.listOfImages.forEach(img => {
      const estate = new Estate();
      estate.id = this.data.id;

      img.id_estate = estate
    })

    this.estateService.update(estate).subscribe(resp => {
    }, err => {
      this.openSnackBar("Dogodila se greska", "PONOVO")
    })
  }

  setDescription() {
    this.editorComponent.editorInstance.setData(this.data.description);
  }

}
