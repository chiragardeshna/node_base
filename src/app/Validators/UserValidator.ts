export class UserValidator {
    static rules() {
        return {
            email: "required|email|max:50",
            firstName: "required|max:50",
            lastName: "string|max:50",
            password: "required|max:12"
        };
    }
}