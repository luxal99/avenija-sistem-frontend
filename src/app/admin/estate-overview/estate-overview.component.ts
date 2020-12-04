import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { AddEstateDialogComponent } from './add-estate-dialog/add-estate-dialog.component';
import { EditEstateDialogComponent } from './edit-estate-dialog/edit-estate-dialog.component';
import { Estate } from 'src/app/models/Estate';
import { EstateService } from 'src/app/service/estate.service';
import { MatDialog } from '@angular/material';
import { OverviewEstateDialogComponent } from './overview-estate-dialog/overview-estate-dialog.component';

@Component({
  selector: 'app-estate-overview',
  templateUrl: './estate-overview.component.html',
  styleUrls: ['./estate-overview.component.css']
})
export class EstateOverviewComponent implements OnInit {

  listOfEstates: Array<Estate> = [];
  searchText = '';
  constructor(private dialog: MatDialog, private estateService: EstateService) { }

  async ngOnInit(): Promise<void> {
    this.getAllEstates();

  }

  searchForm = new FormGroup({
    search: new FormControl("")
  })

  errorHandler(event) {
    console.debug(event);
    event.target.src = "https://cdn.browshot.com/static/images/not-found.png";
  }

  deleteEstate(estate: Estate) {
    this.estateService.delete(estate.id).subscribe(resp => {
      this.getAllEstates();
    })
  }
  getAllEstates() {
    this.estateService.getAll().subscribe(resp => {
      this.listOfEstates = resp as Array<Estate>
      document.getElementById('estate-spinner').style.display ='none'
    })
  }

  openAddEstateDialog() {
    const dialogRef = this.dialog.open(AddEstateDialogComponent, {
      minWidth: '60%',
      position: { right: '0' },
      height: '100vh'

    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllEstates();
    });
  }

  openEstateOverviewDialog(estate) {
    const dialogRef = this.dialog.open(OverviewEstateDialogComponent, {
      minWidth: '60%',
      position: { right: '0' },
      height: '100vh',
      data: estate

    });
  }

  openEstateEditDiloag(estate) {
    const dialogRef = this.dialog.open(EditEstateDialogComponent, {
      minWidth: '60%',
      position: { right: '0' },
      height: '100vh',
      data: estate

    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllEstates();
    });
  }

}
