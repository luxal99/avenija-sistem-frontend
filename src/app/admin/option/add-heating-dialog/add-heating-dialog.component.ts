import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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

  constructor(private heatingService: HeatingService) { }

  ngOnInit() {
  }





  save() {
    this.heatingService.save(new Heating(this.addHeatingForm.get("title").value)).subscribe(resp => {
      console.log(resp);

    })
  }

}
