import { Transform } from "class-transformer";
import { stringToDate } from "../core/transforms";

export class User {
    id: number
    name: string;
    last_name: string;
    email: string;
    address: string;
    zip_code: string;
    phone_number: string;
    card_number: string;
    image: string;
    password: string;
    language: string;

    @Transform(stringToDate, { toClassOnly: true })
    birthdate: Date;
}