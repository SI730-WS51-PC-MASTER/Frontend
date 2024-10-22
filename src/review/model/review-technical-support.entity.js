export class ReviewTechnicalSupport {
    constructor(
        id = 0,
        rating= 0,
        comment = '',
        user_name = '',
        technical_support = ''
    ) {
        this.id = id;
        this.rating = rating;
        this.comment = comment;
        this.user_name = user_name;
        this.technical_support = technical_support;
    }
}