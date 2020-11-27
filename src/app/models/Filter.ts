import { City } from './CIty';
import { EstateCategory } from './EstateCategory';
import { EstateSubCategory } from './EstateSubCategory';
import { PartOfCity } from './PartOfCity';
import { Transaction } from './Transaction';

export class Filter {
    id: number;
    id_city: City;
    id_part_of_city: PartOfCity;
    quadratureFrom: number
    quadratureTo: number;
    priceFrom: number;
    priceTo: number;
    id_transaction_type: Transaction
    id_estate_category: EstateCategory


    _quadrature: number;
    _price: number
    _address;
    _image;
    _title

    constructor(id, price, quadrature, id_city, id_part_of_city, id_transaction_type, estate_category,image,title,address) {

        this.id = id;
        this.id_city = id_city;
        this.id_part_of_city = id_part_of_city;
        this._price = price;
        this._quadrature = quadrature;
        this.id_transaction_type = id_transaction_type;
        this.id_estate_category = estate_category;
        this._address = address;
        this._image = image;
        this._title = title

    }
}