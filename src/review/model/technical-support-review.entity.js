export class TechnicalSupportReview {
    constructor(
        id = 0,
        rating= 0,
        comment = '',
        userName = '',
        technicalSupportId = 0
    ) {
        this.id = id;
        this.rating = rating;
        this.comment = comment;
        this.userName = userName;
        this.technicalSupportId = technicalSupportId;
    }
}