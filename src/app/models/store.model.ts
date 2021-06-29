export class Store {
    id: number;
    name: string;
    description_short: string;
    description: string;
    location: string;
    phone_number: string;
    url: string;
    images: string[];
    logo: string;
    hour_from: string;
    hour_to: string;
    user_fav: boolean;

    match_search_criteria: boolean;
    share_url: string;
}
