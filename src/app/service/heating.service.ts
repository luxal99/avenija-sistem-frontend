import { Injectable } from '@angular/core';
import { Heating } from '../models/Heating';
import { FactoryService } from './factory.service';

@Injectable({
  providedIn: 'root'
})
export class HeatingService extends FactoryService<Heating> {
  route = "heating"
}
