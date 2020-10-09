import { Estate } from './Estate';

export class Image {
    id: number;
    url: string;
    id_estate:Estate


    constructor(url?) {
        this.url = url;

    }

}