import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Accessories } from 'src/app/models/Accessories';
import { Equipment } from 'src/app/models/Equipment';
import { EquipmentService } from 'src/app/service/equipment.service';

@Component({
  selector: 'app-add-equipment-dialog',
  templateUrl: './add-equipment-dialog.component.html',
  styleUrls: ['./add-equipment-dialog.component.css']
})
export class AddEquipmentDialogComponent implements OnInit {


  addEquipmentForm = new FormGroup({
    title: new FormControl("", Validators.required)
  })

  constructor(private equipmentService: EquipmentService,@Inject(MAT_DIALOG_DATA) public data: Equipment) { }

  ngOnInit() {
    this.setValue();
  }

  setValue() {
    if (this.data.id)
      this.addEquipmentForm.get("title").setValue(this.data.title)
  }
  save() {
    if (this.data.id) {
      let equipment = new Equipment(this.addEquipmentForm.get("title").value);
      equipment.id = this.data.id;

      this.equipmentService.update(equipment).subscribe(resp => {

      })

    } else {
      this.equipmentService.save(new Equipment(this.addEquipmentForm.get("title").value)).subscribe(resp => {
        console.log(resp);
      })
    }
  }

}
