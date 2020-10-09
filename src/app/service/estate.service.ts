import { Injectable } from '@angular/core';
import { Estate } from '../models/Estate';
import { FactoryService } from './factory.service';

@Injectable({
  providedIn: 'root'
})
export class EstateService extends FactoryService<Estate>{

  route="estate"
}
