import { EstateCategory } from './EstateCategory';

export class EstateSubCategory {
    id: number;
    title: string;
    id_estate_category: EstateCategory

    constructor(title?, id_estate_category?) {
        this.title = title;
        this.id_estate_category = id_estate_category;
    }
}