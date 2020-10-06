import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { RegistrationDialogComponent } from './registration-dialog/registration-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private dialog:MatDialog) { }

  ngOnInit() {
  }

  openRegistrationDialog() {
    const dialogRef = this.dialog.open(RegistrationDialogComponent, {
      width: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
