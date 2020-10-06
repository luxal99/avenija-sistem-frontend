import { Injectable } from '@angular/core';
import { City } from '../models/CIty';
import { FactoryService } from './factory.service';

@Injectable({
  providedIn: 'root'
})
export class CityService extends FactoryService<City> {
  route = 'city';
}
