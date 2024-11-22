export class ComponentReview {
    constructor(
        id = 0,
        rating= 0,
        comment = '',
        userName = '',
        componentId = 0
    ) {
        this.id = id;
        this.rating = rating;
        this.comment = comment;
        this.userName = userName;
        this.componentId = componentId;
    }
}