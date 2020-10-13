import { UserInfo } from './UserInfo';
import { Location } from "./Location";
import { EstateSubCategory } from './EstateSubCategory';
import { Transaction } from './Transaction';
export class AdvertisingRequest {

    id: number;
    quadrature: number;
    priceFrom: number;
    priceTo: number;
    description: string;

    id_user_info: UserInfo;
    id_location: Location
    id_estate_sub_category: EstateSubCategory
    id_transaction_type: Transaction

    isReviewed:boolean
}