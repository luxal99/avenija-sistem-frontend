import { Injectable } from '@angular/core';
import { Location } from '../models/Location';
import { FactoryService } from './factory.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService extends FactoryService<Location> {
  route = "location"
}
