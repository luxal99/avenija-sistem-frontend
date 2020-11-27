import { City } from './CIty';
import { EstateCategory } from './EstateCategory';
import { PartOfCity } from './PartOfCity';
import { Transaction } from './Transaction';

export class EstateProperty {
    id_city: string;
    id_part_of_city: string;
    id_transaction_type: string
    id_estate_category: string

    constructor(id_city?, id_estate_category?, id_transaction_type?) {
        this.id_estate_category = id_estate_category;
        this.id_transaction_type = id_transaction_type;
        this.id_city = id_city
    }
}