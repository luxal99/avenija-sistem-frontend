import { CityService } from '../service/city.service';
import { City } from './CIty';

export class PartOfCity {
    id: number;
    title: string;
    id_city: City;

    constructor(title?, id_city?: City) {
        this.title = title;
        this.id_city = id_city;
    }
}