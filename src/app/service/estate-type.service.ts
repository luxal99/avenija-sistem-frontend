import { Injectable } from '@angular/core';
import { EstateType } from '../models/EstateType';
import { FactoryService } from './factory.service';

@Injectable({
  providedIn: 'root'
})
export class EstateTypeService extends FactoryService<EstateType> {

  route = "estateType"
}
