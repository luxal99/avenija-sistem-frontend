import { EstateSubCategory } from './EstateSubCategory';

export class EstateCategory {
    id: number;
    title: string;
    listOfEstateSubCategories:Array<EstateSubCategory>

    constructor(title?: string) {
        this.title = title
    }
}