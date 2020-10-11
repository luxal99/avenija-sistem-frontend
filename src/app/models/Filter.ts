import { City } from './CIty';
import { EstateSubCategory } from './EstateSubCategory';
import { Transaction } from './Transaction';

export class Filter {
    id: number;

    id_city: City;
    id_transaction_type: Transaction;
    id_estate_sub_category: EstateSubCategory;
}