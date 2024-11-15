import {Image} from "@/components/model/image.entity.js";

export class Component{
    constructor(
        id= 0,
        name = '',
        description = '',
        price = 0,
        stock = 0,
        provider_id = '',
        image = '',
        ratings = 0,
        model = '',
        color = '',
        dimensions = '',
        material = '',
        weight = '',
        category_type = '',
        category_subType = '',
        category_brand= '',
        //categories = new Categories(),
        //attributes = new Atributes(),
        country = ''

    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.provider_id = provider_id;
        this.image = image;
        this.ratings = ratings;
        this.model = model;
        this.color = color;
        this.dimensions = dimensions;
        this.material = material;
        this.weight = weight;
        this.category_type = category_brand;
        this.category_subType = category_brand;
        this.category_brand = category_brand;
        this.country = country;
    }
}