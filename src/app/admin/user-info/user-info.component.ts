import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  username:string = ""

  userForm = new FormGroup({
    username: new FormControl(""),
    password: new FormControl(),
    password_confirm: new FormControl("")
  })
  constructor(private userService: UserService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getUsername();
  }


  getUsername(){
    this.userService.findByHashedUsername().subscribe(resp=>{
      this.username = resp['username']

      this.userForm.get("username").setValue(resp['username'])
      
    })
  }

  update() {


    let user = new User(this.userForm.get("username").value, this.userForm.get("password").value);
    user.token = localStorage.getItem("token");

    if (user.password === this.userForm.get("password_confirm").value) {

      this.userService.update(user).subscribe(resp => {
        localStorage.removeItem("token");
        location.reload();
      })
    } else {
      this.openSnackBar("Sifre se ne poklapaju", "DONE")
    }


  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
