import { UnauthorizedError } from "../common/errors/unauthorized"

export const validateEmail = (sentEmail: string, tokenEmail?: string) => {
    if (tokenEmail === sentEmail) {
        return
    }

    throw new UnauthorizedError('Invalid token')
}