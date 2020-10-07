import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {


  userForm = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  })

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }


  auth() {
    let user =new User(this.userForm.get("username").value, this.userForm.get("password").value);
    this.authService.auth(user).subscribe(resp => {
      console.log(resp);
      
    })
  }
}
