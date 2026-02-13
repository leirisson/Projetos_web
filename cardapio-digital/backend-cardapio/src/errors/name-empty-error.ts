

export class ErrorNameEmpty extends Error {
    constructor() {
        super('Name must not be empty')
    }
}