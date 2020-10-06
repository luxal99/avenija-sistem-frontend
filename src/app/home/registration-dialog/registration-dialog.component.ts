import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  constructor() { }

  ngOnInit() {
  }

}
