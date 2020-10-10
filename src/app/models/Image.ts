import { Estate } from './Estate';

export class Image {
    id: number;
    title: string
    url: string;
    id_estate: Estate


    constructor(title?, url?, id_estate?) {
        this.url = url;
        this.title = title;
        this.id_estate = id_estate

    }

}