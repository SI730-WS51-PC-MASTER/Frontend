import {Image} from "@/components/model/image.entity.js";

export class Component{
    constructor(
        componentId= 0,
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
        country = ''

    ) {
        this.componentId = componentId;
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
        this.category_type = category_type;
        this.category_subType = category_subType;
        this.category_brand = category_brand;
        this.country = country;
    }
}