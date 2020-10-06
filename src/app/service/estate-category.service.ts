import { Injectable } from '@angular/core';
import { EstateCategory } from '../models/EstateCategory';
import { FactoryService } from './factory.service';

@Injectable({
  providedIn: 'root'
})
export class EstateCategoryService extends FactoryService<EstateCategory> {
route = "estateCategory"
}
