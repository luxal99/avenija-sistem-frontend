import { PartOfCity } from './PartOfCity';

export class Location {
    id: number;

    id_part_of_city: PartOfCity;
    address: string;

    constructor(address?, id_part_of_city?) {
        this.address = address;
        this.id_part_of_city = id_part_of_city
    }
}