import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  constructor(private estateCategoryService: EstateCategoryService) { }

  ngOnInit() {
  }

  save() {
    this.estateCategoryService.save(
      new EstateCategory(this.addEstateCategoryForm.get("title").value)
    ).subscribe(resp => {

    })
  }

}
