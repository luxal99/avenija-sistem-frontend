import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { City } from 'src/app/models/CIty';
import { Equipment } from 'src/app/models/Equipment';
import { EstateType } from 'src/app/models/EstateType';
import { EstateTypeService } from 'src/app/service/estate-type.service';

@Component({
  selector: 'app-add-estate-type-dialog',
  templateUrl: './add-estate-type-dialog.component.html',
  styleUrls: ['./add-estate-type-dialog.component.css']
})
export class AddEstateTypeDialogComponent implements OnInit {


  addEstateTypeForm = new FormGroup({
    title:new FormControl("",Validators.required)
  })
  constructor(private estateTypeService:EstateTypeService,
    @Inject(MAT_DIALOG_DATA) public data: EstateType) { }

  ngOnInit() {
    this.setValue();
  }

  setValue() {
    if (this.data.id)
      this.addEstateTypeForm.get("title").setValue(this.data.title)
  }
  save() {
    if (this.data.id) {
      let estateType = new EstateType(this.addEstateTypeForm.get("title").value);
      estateType.id = this.data.id;

      this.estateTypeService.update(estateType).subscribe(resp => {

      })

    } else {
      this.estateTypeService.save(new EstateType(this.addEstateTypeForm.get("title").value)).subscribe(resp => {
     
      })
    }
  }

}
