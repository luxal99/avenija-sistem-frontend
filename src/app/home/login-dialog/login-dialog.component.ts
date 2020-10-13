import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }


  auth() {
    let user = new User(this.userForm.get("username").value, this.userForm.get("password").value);
    this.authService.auth(user).subscribe(resp => {
      localStorage.setItem("token", resp['token'])


      if (resp['role'].title === 'ADMIN') {
        this.router.navigate(['/admin'])
      } else if (resp['role'].title === 'USER') {
        this.router.navigate(['/client'])
      }

    })
  }
}
