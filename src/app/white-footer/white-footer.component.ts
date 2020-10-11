import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { LoginDialogComponent } from '../home/login-dialog/login-dialog.component';
import { RegistrationDialogComponent } from '../home/registration-dialog/registration-dialog.component';

@Component({
  selector: 'app-white-footer',
  templateUrl: './white-footer.component.html',
  styleUrls: ['./white-footer.component.css']
})
export class WhiteFooterComponent implements OnInit {

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
  openLoginDialog() {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
