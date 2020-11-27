import { City } from './CIty';
import { EstateCategory } from './EstateCategory';
import { EstateProperty } from './EstateProperty';
import { EstateSubCategory } from './EstateSubCategory';
import { PartOfCity } from './PartOfCity';
import { Transaction } from './Transaction';

export class Filter {

    quadratureFrom: number
    quadratureTo: number;
    priceFrom: number;
    priceTo: number;

    estateProperty: EstateProperty

    constructor(priceFrom?, priceTo?, quadratureFrom?, quadratureTo?, estateProepery?:EstateProperty) {
        this.estateProperty = this.estateProperty;
        this.quadratureFrom = quadratureFrom;
        this.quadratureTo = quadratureTo;
        this.priceTo = priceTo;
        this.priceFrom = priceFrom
    }



}