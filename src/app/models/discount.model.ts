import { Transform } from "class-transformer";
import { stringToDate } from "../core/transforms";

export class Discount {
    id: number;
    vip: boolean;
    title: string;
    caption: string;
    image: string;
    description: string;
    user_fav: boolean;

    @Transform(stringToDate, { toClassOnly: true })
    date_from: Date;

    @Transform(stringToDate, { toClassOnly: true })
    date_to: Date;

    share_url: string;
}
