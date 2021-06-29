import { HttpClient } from "@angular/common/http";
import { Token } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { AppleSignInResponse } from "@ionic-native/sign-in-with-apple/ngx";
import { plainToClass } from "class-transformer";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Category } from "../models/category.mode";
import { Discount } from "../models/discount.model";
import { News } from "../models/news.model";
import { Service } from "../models/service.model";
import { Slide } from "../models/slide.model";
import { Store } from "../models/store.model";
import { User } from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  public discounts = new BehaviorSubject<Discount[]>(null);
  public news = new BehaviorSubject<News[]>(null);
  private buffer: string[] = [];

  constructor(
    private http: HttpClient
  ) { }

  getSlides(): Observable<Slide[]> {
    return this.http.get<Slide[]>('/api/slides').pipe(map(data => {
      return plainToClass(Slide, data);
    }));
  }

  getDiscounts(): Observable<Discount[]> {
    if (this.buffer.indexOf('discounts') === -1) {
      this.buffer.push('discounts');
      this.http.get<Discount[]>('/api/discounts').subscribe(response => {
        this.discounts.next(plainToClass(Discount, response));
      });
    }
    return this.discounts;
  }

  getDiscount(discount_id: number): Observable<Discount> {
    return this.http.get<Discount>('/api/discounts/' + discount_id).pipe(map(data => {
      return plainToClass(Discount, data);
    }));
  }

  getStores(category_id?: number): Observable<Store[]> {
    let url = '/api/stores';
    if (category_id) {
      url += '?category_id=' + category_id
    }
    return this.http.get<Store[]>(url).pipe(map(data => {
      return plainToClass(Store, data);
    }));
  }

  getStore(store_id: number): Observable<Store> {
    return this.http.get<Store>('/api/stores/' + store_id).pipe(map(data => {
      return plainToClass(Store, data);
    }));
  }

  saveFavoriteStore(store_id: number): Observable<[]> {
    return this.http.post<[]>('/api/stores/' + store_id + '/fav', []);
  }

  deleteFavoriteStore(store_id: number): Observable<[]> {
    return this.http.delete<[]>('/api/stores/' + store_id + '/fav');
  }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>('/api/events').pipe(map(data => {
      return plainToClass(Event, data);
    }));
  }

  getEvent(event_id: number): Observable<Event> {
    return this.http.get<Event>('/api/events/' + event_id).pipe(map(data => {
      return plainToClass(Event, data);
    }));
  }

  getAllNews(): Observable<News[]> {
    if (this.buffer.indexOf('news') === -1) {
      this.buffer.push('news');
      this.http.get<Discount[]>('/api/news').subscribe(response => {
        this.news.next(plainToClass(News, response));
      });
    }
    return this.news;
  }

  getNews(news_id: number): Observable<News> {
    return this.http.get<News>('/api/news/' + news_id).pipe(map(data => {
      return plainToClass(News, data);
    }));
  }

  saveFavoriteNews(news_id: number): Observable<[]> {
    return this.http.post<[]>('/api/news/' + news_id + '/fav', []);
  }

  deleteFavoriteNews(news_id: number): Observable<[]> {
    return this.http.delete<[]>('/api/news/' + news_id + '/fav');
  }

  saveFavoriteDiscount(discount_id: number): Observable<[]> {
    return this.http.post<[]>('/api/discounts/' + discount_id + '/fav', []);
  }

  deleteFavoriteDiscount(discount_id: number): Observable<[]> {
    return this.http.delete<[]>('/api/discounts/' + discount_id + '/fav');
  }

  subscribeToEvent(event_id: number): Observable<[]> {
    return this.http.post<[]>('/api/events/' + event_id + '/fav', []);
  }

  unsubscribeToEvent(event_id: number): Observable<[]> {
    return this.http.delete<[]>('/api/events/' + event_id + '/fav');
  }

  getServices(vip?: boolean): Observable<Service[]> {
    let url = '/api/services';
    if (vip) {
      url += '-vip';
    }
    return this.http.get<Service[]>(url).pipe(map(data => {
      return plainToClass(Service, data);
    }));
  }

  getService(service_id: number): Observable<Service> {
    return this.http.get<Service>('/api/services/' + service_id).pipe(map(data => {
      return plainToClass(Service, data);
    }));
  }

  registerUser(data: any): Observable<any> {
    return this.http.post('/api/users/add', data);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>('/api/users/edit/' + user.id, user);
  }

  updateUserImage(image: string): Observable<any> {
    let data = {
      photo: image
    }
    return this.http.post('/api/user/new-image', data);
  }

  registerDevice(token: string, device_type: string): Observable<any> {
    let post_data = {
      token: token,
      device_type: device_type
    }
    return this.http.post('/api/devices', post_data);
  }

  loginUser(data: any): Observable<Token> {
    let post_data = {
      grant_type: 'password',
      client_id: environment.oauth.client_id,
      client_secret: environment.oauth.client_secret,
      username: data.email,
      password: data.password
    }
    return this.http.post<Token>('/oauth/token', post_data);
  }

  loginUserWithApple(appleLoginResponse: AppleSignInResponse): Observable<any> {
    return this.http.post<Token>('/api/register-with-apple', { apple_json: JSON.stringify(appleLoginResponse) });
  }

  loginUserWithFacebook(accessToken: string): Observable<any> {
    let post_data = {
      grant_type: 'social',
      client_id: environment.oauth.client_id,
      client_secret: environment.oauth.client_secret,
      provider: 'facebook',
      access_token: accessToken
    }
    return this.http.post<Token>('/oauth/token', post_data);
  }

  loginUserWithGoogle(accessToken: string): Observable<any> {
    let post_data = {
      grant_type: 'social',
      client_id: environment.oauth.client_id,
      client_secret: environment.oauth.client_secret,
      provider: 'google',
      access_token: accessToken
    }
    return this.http.post<Token>('/oauth/token', post_data);
  }

  getUser(): Observable<User> {
    return this.http.get<User>('/api/user').pipe(map(data => {
      return plainToClass(User, data);
    }));
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('/api/categories').pipe(map(data => {
      return plainToClass(Category, data);
    }));
  }
}
