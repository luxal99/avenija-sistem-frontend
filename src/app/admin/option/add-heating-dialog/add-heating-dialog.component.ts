import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Equipment } from 'src/app/models/Equipment';
import { Heating } from 'src/app/models/Heating';
import { HeatingService } from 'src/app/service/heating.service';

@Component({
  selector: 'app-add-heating-dialog',
  templateUrl: './add-heating-dialog.component.html',
  styleUrls: ['./add-heating-dialog.component.css']
})
export class AddHeatingDialogComponent implements OnInit {


  addHeatingForm = new FormGroup({
    title: new FormControl("", Validators.required)
  })

  constructor(private heatingService: HeatingService,@Inject(MAT_DIALOG_DATA) public data: Heating) { }

    ngOnInit() {
    this.setValue();
  }

  setValue() {
    if (this.data.id)
      this.addHeatingForm.get("title").setValue(this.data.title)
  }
  save() {
    if (this.data.id) {
      let heating = new Heating(this.addHeatingForm.get("title").value);
      heating.id = this.data.id;

      this.heatingService.update(heating).subscribe(resp => {

      })

    } else {
      this.heatingService.save(new Heating(this.addHeatingForm.get("title").value)).subscribe(resp => {
        console.log(resp);
      })
    }
  }

}
