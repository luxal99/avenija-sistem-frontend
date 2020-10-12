import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Accessories } from 'src/app/models/Accessories';
import { City } from 'src/app/models/CIty';
import { accessoies } from 'src/app/models/accessoies';
import { AccessoriesService } from 'src/app/service/accessories.service';
import { CityService } from 'src/app/service/city.service';

@Component({
  selector: 'app-add-accessories-dialog',
  templateUrl: './add-accessories-dialog.component.html',
  styleUrls: ['./add-accessories-dialog.component.css']
})
export class AddAccessoriesDialogComponent implements OnInit {


  addAccessoriesForm = new FormGroup({
    title: new FormControl("", Validators.required)
  })

  constructor(private accessoriesService: AccessoriesService,
    @Inject(MAT_DIALOG_DATA) public data: Accessories) { }

  ngOnInit() {
    this.setValue();
  }

  setValue() {
    if (this.data.id)
        this.addAccessoriesForm.get("title").setValue(this.data.title)
  }
  save() {
    if (this.data.id) {
      let accessoies = new Accessories(this.addAccessoriesForm.get("title").value);
      accessoies.id = this.data.id;

      this.accessoriesService.update(accessoies).subscribe(resp => {

      })

    } else {
      this.accessoriesService.save(new Accessories(this.addAccessoriesForm.get("title").value)).subscribe(resp => {
        console.log(resp);
      })
    }
  }


}
