import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  constructor(private estateTypeService:EstateTypeService) { }

  ngOnInit() {
  }

  save(){
    this.estateTypeService.save(
      new EstateType(this.addEstateTypeForm.get("title").value)
    ).subscribe(resp=>{
      
    })
  }

}
