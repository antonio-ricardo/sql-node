import { UnathorizedError } from "../common/errors/unathorized"

export const validateEmail = (sentEmail: string, tokenEmail?: string) => {
    if (tokenEmail === sentEmail) {
        return
    }

    throw new UnathorizedError('Invalid token')
}