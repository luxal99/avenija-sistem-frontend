import { Accessories } from './Accessories';

export class AccessoriesDTO {

    id: number;
    accessories: Accessories
    checked: boolean

    constructor(acc, checked) {
        this.checked = checked;
        this.accessories = acc;
    }
}