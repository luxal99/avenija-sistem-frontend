import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { User } from 'src/app/models/User';
import { UserInfo } from 'src/app/models/UserInfo';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-registration-dialog',
  templateUrl: './registration-dialog.component.html',
  styleUrls: ['./registration-dialog.component.css']
})
export class RegistrationDialogComponent implements OnInit {

  userInfoForm = new FormGroup({
    full_name: new FormControl("", Validators.required),
    email: new FormControl("", Validators.required),
    telephone: new FormControl("", Validators.required)
  })

  userForm = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
    password_confirm: new FormControl("", Validators.required)
  })

  constructor(private userService: UserService,private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  register() {

    let userInfo = new UserInfo(
      this.userInfoForm.get("full_name").value,
      this.userInfoForm.get("email").value,
      this.userInfoForm.get("telephone").value
    );

    let user = new User(this.userForm.get("username").value, this.userForm.get("password").value, userInfo);
     user.id_role = {id:2} 

    if (user.password === this.userForm.get("password_confirm").value) {

      this.userService.save(user).subscribe(resp => {
       

      })
    }else{
      this.openSnackBar("Sifre se ne poklapaju","DONE")
    }


  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
