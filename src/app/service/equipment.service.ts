import { Injectable } from '@angular/core';
import { Equipment } from '../models/Equipment';
import { FactoryService } from './factory.service';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService extends FactoryService<Equipment> {
  route = 'equipment'
}
