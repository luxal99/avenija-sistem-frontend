import { City } from './CIty';
import { EstateCategory } from './EstateCategory';
import { EstateSubCategory } from './EstateSubCategory';
import { Transaction } from './Transaction';

export class Filter {
    id: number;

    id_city: City;
    id_transaction_type: Transaction;
    id_estate_category:EstateCategory;
    id_estate_sub_category: EstateSubCategory;

    constructor(){
    }
}