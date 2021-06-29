import { Injectable } from "@angular/core";
import { Discount } from "../models/discount.model";
import { News } from "../models/news.model";
import { Store } from "../models/store.model";

@Injectable({
  providedIn: 'root'
})
export class DataParamsService {

  public data: any;
  public news: News[];
  public stores: Store[];
  public events: Event[];
  public discounts: Discount[];
  public discounts_vip: Discount[];

  constructor() { }
}
