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

  constructor(private dialog:MatDialog,private router:Router) { }

  ngOnInit() {
  }


  searchOnSell(){
    let filter =
    {
      id_city: "",
      id_transaction_type: {id:1},
      id_estate_category: "",
      id_estate_sub_category: ""
    }
    localStorage.setItem("filter", JSON.stringify(filter));
    this.router.navigate(['/filter'])
    location.reload();
  }

  searchOnRent (){
    let filter =
    {
      id_city: "",
      id_transaction_type: {id:2},
      id_estate_category: "",
      id_estate_sub_category: ""
    }
    localStorage.setItem("filter", JSON.stringify(filter));
    this.router.navigate(['/filter'])
    location.reload();
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
