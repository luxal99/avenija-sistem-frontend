import { City } from './CIty';
import { EstateCategory } from './EstateCategory';
import { PartOfCity } from './PartOfCity';
import { Transaction } from './Transaction';

export class SearchEstate {
    id: number;
    id_city: City;
    id_part_of_city: PartOfCity;
    quadratureFrom: number
    quadratureTo: number;
    priceFrom: number;
    priceTo: number;
    id_transaction_type: Transaction
    estate_category: EstateCategory

    
}