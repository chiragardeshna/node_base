import {compare, hash} from "bcrypt/bcrypt";

export default class Hash {

    public static async make(str: string, saltRounds: number) {
        return await hash(str, saltRounds);
    }

    public static async check(str: string, hash: string) {
        return await compare(str, hash);
    }
}