export class Cart {
    constructor({
                    id = 0,
                    componentId = 0,
                    userId = 0,
                    quantity = 0,
    }) {
        this.id = id;
        this.componentId = componentId;
        this.userId = userId;
        this.quantity = quantity;
    }
}