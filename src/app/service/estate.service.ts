import { Estate } from '../models/Estate';
import { FactoryService } from './factory.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstateService extends FactoryService<Estate>{

  route = "estate"

  getFavorites(): Observable<Array<any>> {
    return this.http.get<Array<any>>(`/${this.route}/favorites`, { responseType: 'json' })
  }

  getPromoted(): Observable<Array<any>> {
    return this.http.get<Array<any>>(`/${this.route}/promoted`, { responseType: 'json' })
  }
}
