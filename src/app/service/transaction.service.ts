import { Injectable } from '@angular/core';
import { FactoryService } from './factory.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService extends FactoryService<TransactionService> {

  route = "transaction"
}
