export class Wishlist {
    constructor({
        id = 0,
        userId = 0,
        componentId = 0,
        quantity = 0,
    })
    {
        this.id = id;
        this.userId = userId;
        this.componentId = componentId;
        this.quantityComponent = quantity;
    }
}
