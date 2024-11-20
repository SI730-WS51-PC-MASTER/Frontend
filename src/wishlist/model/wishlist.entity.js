export class Wishlist {
    constructor({
        id = 0,
        userId = 0,
        quantityComponent = 0,
        componentName = "",
    })
    {
        this.id = id;
        this.userId = userId;
        this.quantityComponent = quantityComponent;
        this.componentName = componentName;
    }
}
