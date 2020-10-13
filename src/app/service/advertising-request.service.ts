import { Injectable } from '@angular/core';
import { AdvertisingRequest } from '../models/AdvertisingRequest';
import { FactoryService } from './factory.service';

@Injectable({
  providedIn: 'root'
})
export class AdvertisingRequestService extends FactoryService<AdvertisingRequest> {

  route="advertising"
}
