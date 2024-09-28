
import {Image} from "@/components/model/image.entity.js";

export class Component{
    constructor(
        id= 0,
        name = '',
        description = '',
        price = 0,
        stock = 0,
        provider_id = '',
        image = new Image(),
        ratings = 0,
        categories = new Categories(),
        attributes = new Atributes(),
        country = '',
        quantity = 0

    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.provider_id = provider_id;
        this.image = image;
        this.ratings = ratings;
        this.categories = categories;
        this.country = country;
        this.quantity = quantity;
    }
}
