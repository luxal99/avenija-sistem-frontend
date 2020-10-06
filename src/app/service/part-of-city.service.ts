import { Injectable } from '@angular/core';
import { PartOfCity } from '../models/PartOfCity';
import { FactoryService } from './factory.service';

@Injectable({
  providedIn: 'root'
})
export class PartOfCityService extends FactoryService<PartOfCity> {

route="partOfCity"
}
