export class Image {
    constructor(
        main = '', // URL de la imagen principal
        secondary = [] // Array de URLs para imágenes secundarias
    ) {
        this.main = main;
        this.secondary = secondary;
    }
}
