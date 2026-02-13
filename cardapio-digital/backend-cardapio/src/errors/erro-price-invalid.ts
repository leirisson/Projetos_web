


export class ErrorPriceInvalid extends Error {
    constructor() {
        super('Price must be greater than 0')
    }
}