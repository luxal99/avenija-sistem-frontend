import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { City } from 'src/app/models/CIty';
import { EstateCategory } from 'src/app/models/EstateCategory';
import { EstateSubCategory } from 'src/app/models/EstateSubCategory';
import { EstateType } from 'src/app/models/EstateType';
import { EstateCategoryService } from 'src/app/service/estate-category.service';
import { EstateSubCategoryService } from 'src/app/service/estate-sub-category.service';

@Component({
  selector: 'app-add-estate-sub-category-dialog',
  templateUrl: './add-estate-sub-category-dialog.component.html',
  styleUrls: ['./add-estate-sub-category-dialog.component.css']
})
export class AddEstateSubCategoryDialogComponent implements OnInit {


  listOfEstateCategories:Array<EstateCategory> = [];

  addEstateSubCategoryForm = new FormGroup({
    title: new FormControl("",Validators.required),
    id_estate_category: new FormControl("",Validators.required)
  })

  selectedEstateCategory;

  constructor(private estateCategoryService:EstateCategoryService,
    private estateSubCategoryService:EstateSubCategoryService,
    @Inject(MAT_DIALOG_DATA) public data: City) { }

  ngOnInit() {
    this.setValue();
    this.getAllEstateCategories();
  }

  setValue() {
    if (this.data.id)
      this.addEstateSubCategoryForm.get("title").setValue(this.data.title)
  }

  getAllEstateCategories(){
    this.estateCategoryService.getAll().subscribe(resp=>{
      this.listOfEstateCategories = resp as Array<EstateCategory>
    })
  }
  save(){
    this.estateSubCategoryService.save(
      new EstateSubCategory(
        this.addEstateSubCategoryForm.get("title").value,
        this.addEstateSubCategoryForm.get("id_estate_category").value
      )
    ).subscribe(resp=>{

    })

  }
}
