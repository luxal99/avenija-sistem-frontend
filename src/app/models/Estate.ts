import { Accessories } from './Accessories';
import { Equipment } from './Equipment';
import { EstateSubCategory } from './EstateSubCategory';
import { EstateType } from './EstateType';
import { Heating } from './Heating';
import { Image } from './Image';
import { Transaction } from './Transaction';
import {Location} from './Location'

export class Estate {

    id: number;

    title:string;
    description: string;
    price: number;
    quadrature: number;
    num_of_bathrooms: number;
    floor: number;
    max_floor: number;
    rooms: number;
    parking: boolean;

    id_estate_sub_category: EstateSubCategory;
    id_transaction_type: Transaction;
    id_heating: Heating;
    id_estate_type: EstateType;
    id_equipment: Equipment;
    id_location: Location;

    listOfAccessories: Set<Accessories>;
    listOfImages:Image[]
}