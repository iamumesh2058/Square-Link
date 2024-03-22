export const NotFoundError = class extends Error {
    constructor(message){
        super(message);
        this.name = 'NotFoundError',
        this.statusCode = 404;
    }
}

export const BadRequestError = class extends Error {
    constructor(message){
        super(message);
        this.name = 'BadRequestError',
        this.statusCode = 400;
    }
}

export const UnauthenticatedError = class extends Error {
    constructor(message){
        super(message);
        this.name = 'UnauthenticatedError',
        this.statusCode = 401;
    }
}

export const UnauthorizedError = class extends Error {
    constructor(message){
        super(message);
        this.name = 'UnauthorizedError',
        this.statusCode = 403;
    }
}