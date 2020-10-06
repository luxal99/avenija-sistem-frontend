import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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

  constructor(private equipmentService: EquipmentService) { }

  ngOnInit() {
  }

  save() {
    this.equipmentService.save(new Equipment(this.addEquipmentForm.get("title").value)).subscribe(resp => {
      console.log(resp);

    })
  }

}
