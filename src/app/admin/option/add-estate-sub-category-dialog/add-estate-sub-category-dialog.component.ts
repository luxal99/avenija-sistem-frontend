import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor(private estateCategoryService:EstateCategoryService,private estateSubCategoryService:EstateSubCategoryService) { }

  ngOnInit() {
    this.getAllEstateCategories();
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
