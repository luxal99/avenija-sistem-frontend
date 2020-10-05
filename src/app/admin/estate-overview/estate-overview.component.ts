import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddEstateDialogComponent } from './add-estate-dialog/add-estate-dialog.component';

@Component({
  selector: 'app-estate-overview',
  templateUrl: './estate-overview.component.html',
  styleUrls: ['./estate-overview.component.css']
})
export class EstateOverviewComponent implements OnInit {

  constructor(private dialog:MatDialog) { }

  async ngOnInit(): Promise<void> {
  }

  openAddWorkOrderDialog() {
    const dialogRef = this.dialog.open(AddEstateDialogComponent, {
      minWidth: '60%',
      position: { right: '0' },
      height:'100vh'

    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
