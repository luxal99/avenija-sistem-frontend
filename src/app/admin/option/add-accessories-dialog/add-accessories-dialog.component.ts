import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Accessories } from 'src/app/models/Accessories';
import { City } from 'src/app/models/CIty';
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

  constructor(private accessoriesService: AccessoriesService) { }

  ngOnInit() {
  }





  save() {
    this.accessoriesService.save(new Accessories(this.addAccessoriesForm.get("title").value)).subscribe(resp => {
      console.log(resp);

    })
  }


}
