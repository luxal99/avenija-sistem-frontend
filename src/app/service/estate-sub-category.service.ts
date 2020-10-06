import { Injectable } from '@angular/core';
import { EstateSubCategory } from '../models/EstateSubCategory';
import { FactoryService } from './factory.service';

@Injectable({
  providedIn: 'root'
})
export class EstateSubCategoryService extends FactoryService<EstateSubCategory>{

  route = "estateSubCategory"
}
