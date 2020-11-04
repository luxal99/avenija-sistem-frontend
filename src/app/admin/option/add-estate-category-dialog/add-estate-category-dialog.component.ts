import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Equipment } from 'src/app/models/Equipment';
import { EstateCategory } from 'src/app/models/EstateCategory';
import { EstateCategoryService } from 'src/app/service/estate-category.service';

@Component({
  selector: 'app-add-estate-category-dialog',
  templateUrl: './add-estate-category-dialog.component.html',
  styleUrls: ['./add-estate-category-dialog.component.css']
})
export class AddEstateCategoryDialogComponent implements OnInit {

  addEstateCategoryForm = new FormGroup({
    title: new FormControl("", Validators.required)
  })
  constructor(private estateCategoryService: EstateCategoryService,@Inject(MAT_DIALOG_DATA) public data: EstateCategory) { }

  ngOnInit() {
    this.setValue();
  }

  setValue() {
    if (this.data.id)
      this.addEstateCategoryForm.get("title").setValue(this.data.title)
  }
  save() {
    if (this.data.id) {
      let estateCategory = new EstateCategory(this.addEstateCategoryForm.get("title").value);
      estateCategory.id = this.data.id;

      this.estateCategoryService.update(estateCategory).subscribe(resp => {
      
        
      })

    } else {
      this.estateCategoryService.save(new EstateCategory(this.addEstateCategoryForm.get("title").value)).subscribe(resp => {
      
      })
    }
  }

}
