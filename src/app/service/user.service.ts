import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { FactoryService } from './factory.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends FactoryService<User> {
  route = "user"

  findByHashedUsername(){
    return this.http.post(`${this.route}/hash`,{token:localStorage.getItem("token")},{responseType:'json'})
  }
}
