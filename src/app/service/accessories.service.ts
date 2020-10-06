import { Injectable } from '@angular/core';
import { Accessories } from '../models/Accessories';
import { FactoryService } from './factory.service';

@Injectable({
  providedIn: 'root'
})
export class AccessoriesService extends FactoryService<Accessories>{
route='accessories'
}
