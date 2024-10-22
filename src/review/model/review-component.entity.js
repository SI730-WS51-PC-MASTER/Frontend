export class ReviewComponent {
    constructor(
        id = 0,
        rating= 0,
        comment = '',
        user_name = '',
        component_name = ''
    ) {
        this.id = id;
        this.rating = rating;
        this.comment = comment;
        this.user_name = user_name;
        this.component_name = component_name;
    }
}