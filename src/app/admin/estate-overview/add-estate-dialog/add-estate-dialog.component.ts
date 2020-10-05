import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-estate-dialog',
  templateUrl: './add-estate-dialog.component.html',
  styleUrls: ['./add-estate-dialog.component.css']
})
export class AddEstateDialogComponent implements OnInit {

  firstFormGroup = new FormGroup({

  })

  secondFormGroup = new FormGroup({
    
  })
  constructor() { }

  ngOnInit() {
  }

}
